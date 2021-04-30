const KoaRouter = require('koa-router');
const { ValidationError } = require('sequelize');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.user = await ctx.orm.user.findByPk(ctx.params.id);
  if (!ctx.state.user) ctx.throw(404);
  return next();
});

router.get('users.list', '/', async (ctx) => {
  const usersList = await ctx.orm.user.findAll();
    await ctx.render('users/index', {
      usersList,
      notice: ctx.flashMessage.notice,
    });
  });

router.get('users.new', '/new', async (ctx) => {
  await ctx.render('users/new', {
      errors: ValidationError.errors,
      submitUserPath: ctx.router.url('users.create'),
    });
});

router.get('users.show', '/:id', async (ctx) => {
  const {user} = ctx.state;
  await ctx.render('users/show', {
      user,
      notice: ctx.flashMessage.notice
    });
  });

router.post('users.create', '/', async(ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save({ fields: ['lastName', 'firstName', 'email', 'tag', 'description', 'image'] });
    ctx.redirect(ctx.router.url('users.list'));
  } catch (ValidationError) {
    await ctx.render('users/new', {
      errors: ValidationError.errors,
      submitUserPath: ctx.router.url('users.create'),
    });
  }
});

module.exports = router;