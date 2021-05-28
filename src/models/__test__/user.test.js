const orm = require('..');

describe('user model', () => {
  beforeAll(async () => {
    await orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await orm.sequelize.close();
  });

  describe('checkPassword', () => {
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

    test('Retornar true si la contraseña coincide con su version hasheada', async () => {
      const { email, password } = userData;
      const user = await orm.user.findOne({ where: { email } });
      expect(await user.checkPassword(password)).toBe(true);
    });
    test('Retornar false si la contraseña no coincide con su version hasheada', async () => {
      const { email, password } = userData;
      const user = await orm.user.findOne({ where: { email } });
      expect(await user.checkPassword(`${password}sdafjfh12321`)).toBe(false);
    });
  });
});
