'use strict';

const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const User = sequelize.define('User', {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  full_name: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.first_name} ${this.last_name}`
    }
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      isEmail: {
        msg: "Must be an EMAIL ",
      },
    }
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
    }
  },
  token: {
    type: DataTypes.STRING,
  },
  token_expired_on: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'User',
});

module.exports = User;