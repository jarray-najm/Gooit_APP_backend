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

// User.hasMany(BalanceBook, { foreignKey: "user_id", as: "balanceBooks" });
// BalanceBook.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Trip.hasMany(BalanceBook, { foreignKey: "trip_id", as: "balanceBooks" });
// BalanceBook.belongsTo(Trip, { foreignKey: "trip_id", as: "trip" });

// Station.hasMany(Trip, { foreignKey: "start_station_id", as: "startingTrips" });
// Station.hasMany(Trip, { foreignKey: "end_station_id", as: "endingTrips" });
// Trip.belongsTo(Station, { foreignKey: "start_station_id", as: "startStation" });
// Trip.belongsTo(Station, { foreignKey: "end_station_id", as: "endStation" });

// Line.hasMany(Station, { foreignKey: "line_id", as: "stations" });
// Station.belongsTo(Line, { foreignKey: "line_id", as: "line" });

// Sync models with the database
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
