const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Rooms = require("./Rooms");


const Messages = sequelize.define('Messages', {
    message: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    roomId: {
        type: DataTypes.INTEGER,
        references: {
            model: Rooms,
            key: "id",
        }
    },
    senderId: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.ENUM('message', 'attachment'),
        defaultValue: 'message',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'messages',
});

module.exports = Messages;