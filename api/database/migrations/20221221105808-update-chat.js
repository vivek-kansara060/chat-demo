'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Chat', 'room', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'data',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Chat', 'room');
  }
};
