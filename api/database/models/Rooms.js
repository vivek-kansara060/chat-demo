'use strict';

const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Rooms = sequelize.define('Rooms', {
    room: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: "rooms",
});

module.exports = Rooms;