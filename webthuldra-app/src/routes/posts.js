const KoaRouter = require('koa-router');
const { ValidationError } = require('sequelize');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.post = await ctx.orm.post.findByPk(ctx.params.id);
  if (!ctx.state.post) ctx.throw(404);
  return next();
});

router.get('posts.list', '/', async (ctx) => {
  const postsList = await ctx.orm.post.findAll();
    await ctx.render('posts/index', {
      postsList,
      notice: ctx.flashMessage.notice,
    });
  });

router.get('posts.new', '/new', async (ctx) => {
  await ctx.render('posts/new', {
      errors: ValidationError.errors,
      submitPostPath: ctx.router.url('posts.create'),
    });
  });

router.get('posts.show', '/:id', async (ctx) => {
  const {post} = ctx.state;
  await ctx.render('posts/show', {
      post,
      notice: ctx.flashMessage.notice
    });
  });

router.post('posts.create', '/', async(ctx) => {
  const post = ctx.orm.post.build(ctx.request.body);
  try {
    await post.save({ fields: ['caption', 'media', 'userId'] });
    ctx.redirect(ctx.router.url('posts.list'));
  } catch (ValidationError) {
    await ctx.render('posts/new', {
      errors: ValidationError.errors,
      submitPostPath: ctx.router.url('posts.create'),
    });
  }
});

module.exports = router;