const KoaRouter = require('koa-router');
const { ValidationError } = require('sequelize');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.post = await ctx.orm.post.findByPk(id, { include: ctx.orm.user });
  if (!ctx.state.post) ctx.throw(404);
  return next();
});

router.get('posts.new', '/new', async (ctx) => {
  const userList = await ctx.orm.user.findAll();
  const post = ctx.orm.post.build();
  await ctx.render('posts/new', {
    post,
    userList,
    errors: ValidationError.errors,
    submitPostPath: ctx.router.url('posts.create'),
  });
});

router.get('posts.show', '/:id', async (ctx) => {
  const { post } = ctx.state;
  await ctx.render('posts/show', {
    post,
    notice: ctx.flashMessage.notice,
  });
});

router.post('posts.create', '/', async (ctx) => {
  const { _method } = ctx.request.body;
  if (_method && _method === 'put') ctx.redirect(ctx.router.url('posts.modify'));
  if (_method && _method === 'delete') ctx.redirect(ctx.router.url('posts.remove'));

  const mediaUrl = ctx.request.body.media;
  if (!mediaUrl) delete ctx.request.body.media;

  const post = ctx.orm.post.build(ctx.request.body);
  try {
    await post.save({
      fields: [
        'caption',
        'media',
        'userId',
      ],
    });
    ctx.redirect(ctx.router.url('root'));
  } catch (e) {
    const userList = await ctx.orm.user.findAll();
    await ctx.render('posts/new', {
      post,
      userList,
      errors: e.errors,
      submitPostPath: ctx.router.url('posts.create'),
    });
  }
});

router.get('posts.update', '/:id/update', async (ctx) => {
  const { post } = ctx.state;
  await ctx.render('posts/update', {
    post,
    submitPostPath: ctx.router.url('posts.create'),
    errors: ValidationError.errors,
  });
});

router.put('posts.modify', '/', async (ctx) => {
  const postId = ctx.request.body.id;
  delete ctx.request.body.id;

  const mediaUrl = ctx.request.body.media;
  if (!mediaUrl) ctx.request.body.media = null;

  try {
    await ctx.orm.post.update(ctx.request.body, {
      where: { id: postId },
    });
    ctx.redirect(ctx.router.url('posts.show', postId));
  } catch (e) {
    await ctx.render('post/update', {
      errors: e.errors,
      submitPostPath: ctx.router.url('posts.create'),
    });
  }
});

router.get('posts.update', '/:id/update', async (ctx) => {
  const { post } = ctx.state;
  await ctx.render('posts/update', {
    post,
    submitpostPath: ctx.router.url('posts.create'),
    errors: ValidationError.errors,
  });
});

router.get('posts.delete', '/:id/delete', async (ctx) => {
  const { post } = ctx.state;
  await ctx.render('posts/delete', {
    post,
    submitpostPath: ctx.router.url('posts.create'),
    errors: ValidationError.errors,
  });
});

router.delete('posts.remove', '/', async (ctx) => {
  const postId = ctx.request.body.id;

  try {
    const post = await ctx.orm.post.findByPk(postId);
    post.destroy();
    ctx.redirect(ctx.router.url('root'));
  } catch (e) {
    await ctx.render('posts/delete', {
      errors: e.errors,
      submitpostPath: ctx.router.url('posts.create'),
    });
  }
});

module.exports = router;
