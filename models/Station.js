const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Station = sequelize.define("Station", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nameStation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // ensures the value is not an empty string
      len: [1, 100], // ensures the value length is between 1 and 100 characters
    },
  },
  codeStation: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // ensures the value is unique
    validate: {
      notEmpty: true, // ensures the value is not an empty string
      len: [1, 50], // ensures the value length is between 1 and 50 characters
    },
  },
  addresseStation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // ensures the value is not an empty string
      len: [1, 200], // ensures the value length is between 1 and 200 characters
    },
  },
});

module.exports = Station;
