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
    const likesPost1 = [
      {
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('likes', likesPost1, {});
  },

  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  down: async (queryInterface) => queryInterface
    .bulkDelete('likes', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    }),
};
