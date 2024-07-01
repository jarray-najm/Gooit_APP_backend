const { User, Trip, Payment, Balance, BalanceBook } = require("../models");
const bcrypt = require("bcrypt");

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const role = "user"; // Assuming 'user' role by default
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "Signup successful!", userData });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // Fetch user's trips
    const trips = await Trip.findAll({ where: { user_id: user.id } });
    // Fetch user's payments
    const payments = await Payment.findAll({ where: { user_id: user.id } });
    // Fetch user's balance
    const balance = await Balance.findOne({ where: { user_id: user.id } });
    // Fetch user's balance books
    // const balanceBooks = await BalanceBook.findAll({
    //   where: { user_id: user.id },
    // });

    // Construct response object
    const userData = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        // balance: balance ? balance.amount : 0, // If balance is null, set to 0
        // trips,
        // payments,
        // balanceBooks,
      },
    };

    res.json({ message: "Login successful!", userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
