const KoaRouter = require('koa-router');

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
      userPath: (user) => ctx.router.url('users.show', {id: user.id}),
      notice: ctx.flashMessage.notice,
    });
  });

router.get('users.show', '/:id', async (ctx) => {
  const {user} = ctx.state;
  await ctx.render('users/show', {
      user,
      notice: ctx.flashMessage.notice
    });
  });

module.exports = router;