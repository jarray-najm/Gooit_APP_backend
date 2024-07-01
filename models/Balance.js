const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Balance = sequelize.define("Balance", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      isInt: true, // ensures the value is an integer
    },
  },
  balanceAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0, // Set default value to 0
    validate: {
      isFloat: true, // ensures the value is a float
      min: 0, // ensures the balanceAmount is non-negative
    },
  },
  recharge_Date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: true, // ensures the value is a valid date
    },
  },
});

module.exports = Balance;
