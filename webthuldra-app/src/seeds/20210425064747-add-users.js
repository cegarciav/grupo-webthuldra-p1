'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const users = [
      {
        firstName: "Elsa",
        lastName: "de Arendelle",
        email: "elsa.arendelle@arendelle.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Anna",
        lastName: "de Arendelle",
        email: "anna.arendelle@arendelle.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
