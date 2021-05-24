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
    const commentsPost1 = [
      {
        content: '¡Pero qué buen panorama!',
        userId: 2,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: '¡Nos vemos pronto!',
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('comments', commentsPost1, {});
  },

  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  down: async (queryInterface) => queryInterface
    .bulkDelete('comments', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    }),
};
