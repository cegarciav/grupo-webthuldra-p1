const orm = require('../models');
const { userIdentificationPosts } = require('./userIdentificationPosts');

describe('userIdentificationPosts middleware', () => {
  const ctx = { orm };
  let user1 = null;
  let user2 = null;
  let post = null;
  const userData1 = {
    firstName: 'Hola',
    lastName: 'Hola',
    email: 'hola.hola@hola.com',
    password: 'pass',
  };
  const userData2 = {
    firstName: 'Chao',
    lastName: 'Chao',
    email: 'hola.Chao@hola.com',
    password: 'pass2',
  };
  const postData = {
    caption: 'whatever',
  };

  describe('Si el usuario no es dueño del post', () => {
    beforeAll(async () => {
      await orm.sequelize.sync({ force: true });
      user1 = await orm.user.create(userData1);
      postData.userId = user1.id;
      post = await orm.post.create(postData);
      user2 = await orm.user.create(userData2);
    });
    test('llama el error 403', async () => {
      beforeAll(async () => {
        ctx.params = {
          userId: post.userId,
        };
        ctx.state = {
          currentUser: user2,
        };
        ctx.throw = jest.fn();
        const result = await userIdentificationPosts(ctx, () => {});
        expect(result).toThrow(403);
      });
    });
  });

  afterAll(async () => {
    await orm.sequelize.close();
  });
});
