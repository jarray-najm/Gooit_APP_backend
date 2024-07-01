const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Line = sequelize.define("Line", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  line_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // ensures the value is not an empty string
      len: [1, 100], // ensures the value length is between 1 and 100 characters
    },
  },
  line_number: {
    type: DataTypes.INTEGER,

    unique: true, // ensures the value is unique

    allowNull: false,
    validate: {
      isInt: true, // ensures the value is an integer
    },
  },
  line_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true, // ensures the value is a float
      min: 0, // ensures the line_price is non-negative
    },
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      // isDate: true, // ensures the value is a valid date/time
    },
  },
  line_stations_json: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty: true, // ensures the value is not an empty JSON object
      isJSON(value) {
        // custom validator to check if value is a valid JSON
        try {
          JSON.parse(JSON.stringify(value));
        } catch (e) {
          throw new Error("Invalid JSON format");
        }
      },
    },
  },
});

module.exports = Line;
