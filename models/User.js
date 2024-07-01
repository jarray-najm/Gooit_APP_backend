const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // will not allow empty strings
      len: [3, 30], // only allow values with length between 4 and 30
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // checks for email format (foo@bar.com)
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // will not allow empty strings
      len: [8, 100], // only allow values with length between 8 and 100
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
    validate: {
      isIn: [["admin", "user", "guest"]], // only allow certain values
    },
  },
});

module.exports = User;
