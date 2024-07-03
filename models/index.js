const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Trip = require("./Trip");
const Balance = require("./Balance");
const Payment = require("./Payment");
// const BalanceBook = require("./BalanceBook");
const Station = require("./Station");
const Line = require("./Line");

// Associations
User.hasMany(Trip, { foreignKey: "user_id", as: "trips" });
Trip.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasOne(Balance, { foreignKey: "user_id", as: "balance" });
Balance.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Payment, { foreignKey: "user_id", as: "payments" });
Payment.belongsTo(User, { foreignKey: "user_id", as: "user" });

sequelize.sync({ alter: true });

module.exports = {
  User,
  Trip,
  Balance,
  Payment,
  // BalanceBook,
  Station,
  Line,
};
