const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10;

module.exports = {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
  up: async (queryInterface) => {
    const users = [
      {
        firstName: 'Elsa',
        lastName: 'de Arendelle',
        email: 'elsa.arendelle@arendelle.com',
        picture: 'https://www.parati.com.ar/wp-content/uploads/2020/02/FROZEN-ELSA-OSCARS-DESTACADA-GENTILEZA-DISNEY.jpg',
        description: 'Libre soy...',
        tag: 'elsafreski',
        password: bcrypt.hashSync('frozen', PASSWORD_SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Anna',
        lastName: 'de Arendelle',
        email: 'anna.arendelle@arendelle.com',
        picture: 'https://lumiere-a.akamaihd.net/v1/images/ct_frozen_anna_18466_6775584b.jpeg?region=0,0,600,600',
        description: 'Love is an open door',
        tag: 'AnnaHugs',
        password: bcrypt.hashSync('kristoffmiam0r', PASSWORD_SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('users', users, {});
  },

  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  down: async (queryInterface) => queryInterface
    .bulkDelete('users', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    }),
};
