const orm = require('..');

describe('post model', () => {
  beforeAll(async () => {
    await orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await orm.sequelize.close();
  });

  describe('isLikedByUser', () => {
    let user = null;
    let post1 = null;
    let post2 = null;
    const userData = {
      firstName: 'Charlie',
      lastName: 'Brownie',
      email: 'cnolivos@uc.cl',
      tag: 'lolman',
      description: 'nice guy',
      password: 'password',
    };
    const postData = {
      caption: 'Mucho texto',
    };

    beforeAll(async () => {
      user = await orm.user.create(userData);
      postData.userId = user.id;
      post1 = await orm.post.create(postData);
      post2 = await orm.post.create(postData);
      await orm.like.create({ userId: user.id, postId: post1.id });
    });

    test('Retornar true si el userId aparece en los likes del post', async () => {
      const post = await orm.post.findByPk(post1.id, {
        include: [{
          model: orm.user,
        },
        {
          association: 'likers',
        }],
      });
      expect(post.isLikedByUser(user.id)).toBe(true);
    });
    test('Retornar false si el userId no aparece en los likes del post', async () => {
      const post = await orm.post.findByPk(post2.id, {
        include: [{
          model: orm.user,
        },
        {
          association: 'likers',
        }],
      });
      expect(post.isLikedByUser(user.id)).toBe(false);
    });
  });
});
