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
        picture: "https://www.parati.com.ar/wp-content/uploads/2020/02/FROZEN-ELSA-OSCARS-DESTACADA-GENTILEZA-DISNEY.jpg",
        description: "Libre soy...",
        tag: "elsafreski",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Anna",
        lastName: "de Arendelle",
        email: "anna.arendelle@arendelle.com",
        picture: "https://lumiere-a.akamaihd.net/v1/images/ct_frozen_anna_18466_6775584b.jpeg?region=0,0,600,600",
        description: "Love is an open door",
        tag: "AnnaHugs",
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
     return await queryInterface.bulkDelete('users', null, {});
  }
};
