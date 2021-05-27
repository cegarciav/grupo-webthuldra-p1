const orm = require('..');

describe('user model', () => {
  beforeAll(async () => {
    await orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await orm.sequelize.close();
  });

  describe('getFullName', () => {
    const userData = {
      firstName: 'Charlie',
      lastName: 'Brownie',
      email: 'cnolivos@uc.cl',
      tag: 'lolman',
      description: 'nice guy',
      password: 'password',
    };

    beforeAll(async () => {
      await orm.user.create(userData);
    });

    test('returns the full name of the user with a space in between', async () => {
      const { email, firstName, lastName } = userData;
      const user = await orm.user.findOne({ where: { email } });
      expect(user.getFullName()).toBe(`${firstName} ${lastName}`);
    });
  });
});
