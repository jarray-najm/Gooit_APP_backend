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
      notEmpty: true,
      len: [1, 100],
    },
  },
  codeStation: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 50],
    },
  },
  addresseStation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 200],
    },
  },
});

module.exports = Station;
