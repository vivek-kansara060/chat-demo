'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      roomId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "rooms"
          },
          key: 'id'
        }
      },
      senderId: {
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('message', 'attachment'),
        defaultValue: 'message',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('messages');
  }
};
