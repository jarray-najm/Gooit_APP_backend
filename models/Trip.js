const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Trip = sequelize.define("Trip", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true, // ensures the value is an integer
    },
  },
  trip_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // ensures the value is not an empty string
      len: [1, 100], // ensures the value length is between 1 and 100 characters
    },
  },
  trip_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true, // ensures the value is an integer
    },
  },
  trip_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true, // ensures the value is a float
      min: 0, // ensures the value is non-negative
    },
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      // isDate: true, // ensures the value is a valid date/time
    },
  },
  trip_stations_json: {
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
  Date_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: true, // ensures the value is a valid date
    },
  },
});

module.exports = Trip;

/*
{
    "message": "Signup successful!",
 
    "userData": {
        "id": 2,
            "email": "Najm.doe@example.com",
            "role": "admin",
            "balance": 0,
            "trips": [],
            "payments": [],
            "balanceBooks": []
        }
    }
}

*/
