const { User, Station, Line, Payment } = require("../models");
const sequelize = require("../config/database"); // Import sequelize instance

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: ["trips", "payments", "balance"],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addStation = async (req, res) => {
  try {
    const { nameStation, codeStation, addresseStation } = req.body;
    const station = await Station.create({
      nameStation,
      codeStation,
      addresseStation,
    });
    res.status(201).json({ message: "Station created successfully!", station });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Send detailed validation error messages
      const messages = error.errors.map((e) => e.message);
      console.log(messages);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Edit a station
exports.editStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameStation, codeStation, addresseStation } = req.body;
    const station = await Station.findByPk(id);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    station.nameStation = nameStation;
    station.codeStation = codeStation;
    station.addresseStation = addresseStation;
    await station.save();
    res.json({ message: "Station updated successfully!", station });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a station
exports.deleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Station.findByPk(id);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    await station.destroy();
    res.json({ message: "Station deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all stations
exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.findAll();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new line
// exports.addLine = async (req, res) => {
//   try {
//     const { line_name, line_number, line_price, start_time, stations_json } =
//       req.body;
//     const line = await Line.create({
//       line_name,
//       line_number,
//       line_price,
//       start_time,
//       stations_json,
//     });
//     res.status(201).json({ message: "Line created successfully!", line });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// Add a new line

// Add a new line
exports.addLine = async (req, res) => {
  const transaction = await sequelize.transaction(); // Start transaction
  try {
    const {
      line_name,
      line_number,
      line_price,
      start_time,
      line_stations_json,
    } = req.body;

    // Create the line
    const line = await Line.create(
      {
        line_name,
        line_number,
        line_price,
        start_time,
        line_stations_json,
      },
      { transaction }
    );

    // Create each station associated with the line
    for (const stationData of line_stations_json) {
      const { nameStation, codeStation, addresseStation } = stationData;

      // Check if the station already exists
      const existingStation = await Station.findOne({
        where: { codeStation },
        transaction,
      });

      if (!existingStation) {
        await Station.create(
          {
            nameStation,
            codeStation,
            addresseStation,
          },
          { transaction }
        );
      } else {
        console.log(
          `Station with code ${codeStation} already exists. Skipping.`
        );
      }
    }

    await transaction.commit(); // Commit the transaction
    res
      .status(201)
      .json({ message: "Line and stations created successfully!", line });
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction in case of error
    res.status(500).json({ error: error.message });
  }
};
// Edit a line
exports.editLine = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      line_name,
      line_number,
      line_price,
      start_time,
      line_stations_json,
    } = req.body;
    const line = await Line.findByPk(id);
    if (!line) {
      return res.status(404).json({ error: "Line not found" });
    }
    line.line_name = line_name;
    line.line_number = line_number;
    line.line_price = line_price;
    line.start_time = start_time;
    line.line_stations_json = line_stations_json;
    await line.save();
    res.json({ message: "Line updated successfully!", line });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a line
exports.deleteLine = async (req, res) => {
  try {
    const { id } = req.params;
    const line = await Line.findByPk(id);
    if (!line) {
      return res.status(404).json({ error: "Line not found" });
    }
    await line.destroy();
    res.json({ message: "Line deleted successfully!" });
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
// Get the sum of all payment amounts
exports.getSumOfPayments = async (req, res) => {
  try {
    const sumOfAllPay = (await Payment.sum("amount")) || 0; // If sum is null, use 0 instead
    res.json({ sumOfAllPay });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
