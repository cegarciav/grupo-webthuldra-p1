module.exports = {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  up: async (queryInterface, Sequelize) => queryInterface
    .sequelize.transaction(async (t) => Promise.all([
      queryInterface.addColumn(
        'users',
        'tag',
        Sequelize.STRING,
        { transaction: t },
      ),
      queryInterface.addColumn(
        'users',
        'picture',
        {
          type: Sequelize.STRING,
          validate: {
            isUrl: true,
          },
        },
        { transaction: t },
      ),
      queryInterface.addColumn(
        'users',
        'description',
        Sequelize.STRING,
        { transaction: t },
      ),
      queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.STRING,
          validate: {
            notEmpty: true,
          },
        },
        { transaction: t },
      ),
    ])),

  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
  down: async (queryInterface) => queryInterface
    .sequelize.transaction(async (t) => Promise.all([
      queryInterface.removeColumn(
        'users',
        'tag',
        { transaction: t },
      ),
      queryInterface.removeColumn(
        'users',
        'picture',
        { transaction: t },
      ),
      queryInterface.removeColumn(
        'users',
        'description',
        { transaction: t },
      ),
      queryInterface.removeColumn(
        'users',
        'password',
        { transaction: t },
      ),
    ])),
};
