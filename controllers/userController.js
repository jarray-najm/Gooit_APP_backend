const {
  User,
  Trip,
  Balance,
  Payment,
  // BalanceBook,
  Station,
  Line,
} = require("../models");

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: ["trips", "payments", "balance"],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.username = username;
    user.email = email;
    user.role = role;
    await user.save();
    res.json({ message: "Profile updated successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete user profile
exports.deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "Profile deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// !----------------------------------------------------------------
// Add trip
exports.addTrip = async (req, res) => {
  try {
    const {
      user_id,
      trip_name,
      trip_number,
      trip_price,
      start_time,
      trip_stations_json,
    } = req.body;

    // Check if trip_stations_json is an array
    if (!Array.isArray(trip_stations_json) || trip_stations_json.length < 2) {
      return res.status(400).json({
        error: "Trip stations must be an array with at least two stations",
      });
    }

    // Find start station
    const startStation = await Station.findOne({
      where: { codeStation: trip_stations_json[0].codeStation },
    });
    if (!startStation) {
      return res.status(400).json({ error: "Start station not found" });
    }

    // Find end station
    const endStation = await Station.findOne({
      where: {
        codeStation:
          trip_stations_json[trip_stations_json.length - 1].codeStation,
      },
    });
    if (!endStation) {
      return res.status(400).json({ error: "End station not found" });
    }

    // Create the trip
    const trip = await Trip.create({
      user_id,
      trip_name,
      trip_number,
      trip_price,
      start_time,
      trip_stations_json,
    });

    res.status(201).json({ message: "Trip added successfully!", trip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deduct payment amount
exports.deductPayment = async (req, res) => {
  try {
    const { user_id, amount } = req.body;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // January is 0
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const payment_Date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // Deduct payment from user's balance
    let balance = await Balance.findOne({ where: { user_id } });
    if (!balance) {
      return res.status(404).json({ error: "Balance not found" });
    }
    if (balance.balanceAmount < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    balance.balanceAmount -= amount;
    await balance.save();

    // Add record to payments table
    const payment = await Payment.create({
      user_id,
      amount,
      payment_Date,
    });

    res.json({
      message: "Payment deducted and recorded successfully!",
      payment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//!----------------------------------------------------------------
// Recharge balance
exports.rechargeBalance = async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // January is 0
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const recharge_Date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    let balance = await Balance.findOne({ where: { user_id } });

    // If balance doesn't exist, create a new one with balanceAmount initialized to 0
    if (!balance) {
      balance = await Balance.create({
        user_id,
        balanceAmount: 0,
        recharge_Date,
      });
    }

    // Ensure balance.balanceAmount is not null before adding amount
    if (balance.balanceAmount === null) {
      balance.balanceAmount = 0;
    }

    // Recharge the balance
    balance.balanceAmount += amount;
    await balance.save();

    res.json({ message: "Balance recharged successfully!", balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get trips by user_id
exports.getTripsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const trips = await Trip.findAll({ where: { user_id } });
    if (!trips || trips.length === 0) {
      return res.status(404).json({ error: "Trips not found for this user" });
    }
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all stations
exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.findAll();
    res.status(200).json(stations); // Correctly send the stations as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all lines
exports.getAllLines = async (req, res) => {
  try {
    const lines = await Line.findAll();
    res.json(lines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get lines by line_number
exports.getLinesByNumber = async (req, res) => {
  try {
    const { line_number } = req.query; // Retrieve line_number from query parameters

    // Find lines by line_number
    const lines = await Line.findAll({ where: { line_number } });

    if (lines.length === 0) {
      return res
        .status(404)
        .json({ error: "No lines found with the given number" });
    }

    res.json(lines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all payments for a specific user
exports.getAllPaymentsByuser_id = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const payments = await Payment.findAll({ where: { user_id } });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
