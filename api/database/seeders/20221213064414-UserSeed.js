'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    return queryInterface.bulkInsert(
      'User',
      [
        {
          first_name: 'Vivek',
          last_name: "Kansara",
          email: "vivek@google.com",
          password: await bcrypt.hash('1234656', salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: 'Danny',
          last_name: "Salvoa",
          email: "danny@google.com",
          password: await bcrypt.hash('1234656', salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: 'Alexa',
          last_name: "Thomas",
          email: "Alexa@google.com",
          password: await bcrypt.hash('1234656', salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: 'Dominic',
          last_name: "Torreto",
          email: "dom@google.com",
          password: await bcrypt.hash('1234656', salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: 'Samantha',
          last_name: "Roman",
          email: "sam@google.com",
          password: await bcrypt.hash('1234656', salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
