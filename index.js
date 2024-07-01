require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4040;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// http:10.0.2.2:4040/admin/
// Routes
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", authenticate, userRoutes);
// app.use("/api/v1/admin", authenticate, adminRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
// New endpoint directly in app.js
app.use(express.static("public"));

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
