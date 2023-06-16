'use strict';

const sequelize = require("../connection");
const { DataTypes } = require('sequelize');
const User = require('./User');
const Rooms = require('./Rooms');

const UserContacts = sequelize.define('UserContacts', {
  userid: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  contactuserid: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  request: {
    type: DataTypes.ENUM('sent', 'accepted', 'rejected'),
    defaultValue: 'sent',
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'deleted'),
    defaultValue: 'active',
  },
  room: {
    type: DataTypes.INTEGER,
    references: {
      model: Rooms,
      key: 'id'
    }
  }
}, {
  tableName: 'user_contacts',
});

// UserContacts.belongsTo(User, { as: "user", foreignKey: 'userid' });


module.exports = UserContacts;