'use strict';

const User = require('../models/User');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'User',
          },
          key: "id"
        }
      },
      contactuserid: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'User',
          },
          key: "id"
        }
      },
      request: {
        type: Sequelize.ENUM('sent', 'accepted', 'rejected'),
        defaultValue: 'sent',
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'deleted'),
        defaultValue: 'active',
      },
      room: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "rooms"
          },
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_contacts');
  }
};