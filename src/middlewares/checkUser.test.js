const orm = require('../models');
const { checkUser } = require('./checkUser');

describe('checkUser middleware', () => {
  const ctx = { orm };

  beforeAll(async () => {
    await orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await orm.sequelize.close();
  });

  describe('cuando hay un currentUser en ctx.state', () => {
    let user;
    beforeAll(async () => {
      const userData = {
        firstName: 'Camilo',
        lastName: 'Garcia',
        email: 'cgarcia@uc.cl',
        tag: 'sr Camilo',
        description: 'nice and very formal guy',
        password: 'contraseña',
      };
      user = await orm.user.create(userData);
      ctx.params = {
        userId: user.id,
      };
      ctx.state = {};
    });
  });

  describe('cuando el id del user no coincide con el ctx.params.userId', () => {
    beforeAll(async () => {
      ctx.state = {};
      ctx.throw = jest.fn();
    });

    test('llama el error 401 (not found)', async () => {
      await checkUser(ctx, () => {});
      expect(ctx.throw).toHaveBeenCalledWith(401);
    });
  });
});
