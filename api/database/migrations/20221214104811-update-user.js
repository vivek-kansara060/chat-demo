'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      'User',
      'token',
      {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'password',
      }
    )
    await queryInterface.addColumn(
      'User',
      'token_expired_on',
      {
        type: Sequelize.DATE,
        allowNull: true,
        after: 'token',
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'token')
    await queryInterface.removeColumn('User', 'token_expired_on');
  }
};
