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

     const postsElsa = [
      {
        caption: "¡El día está perfecto para salir a patinar! Recuerden traer sus patines al lago, habitantes de Arendelle, porque lo congelaré a eso de las 17.00 hrs. ¡No olviden mantener distancia y usar una mascarilla!",
        media: "https://i.pinimg.com/originals/00/16/74/0016747655996706230638e919196f27.gif",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return await queryInterface.bulkInsert("posts", postsElsa, {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('posts', null, {});
  }
};
