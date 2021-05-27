const KoaRouter = require('koa-router');
const { checkUser } = require('../middlewares/checkUser');

const router = new KoaRouter();

router.get('session.new', '/new', async (ctx) => {
  const { currentUser } = ctx.state;
  if (currentUser) {
    ctx.redirect(ctx.router.url('root'));
    return;
  }

  await ctx.render(
    'session/new', {
      submitPath: ctx.router.url('session.create'),
    },
  );
});

router.post('session.create', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email } });
  const authenticated = user && await user.checkPassword(password);

  if (user && authenticated) {
    ctx.session.currentUserId = user.id;
    ctx.redirect('/');
  } else {
    await ctx.render('session/new', {
      error: 'Email y/o contraseña incorrectos',
      email,
      submitPath: ctx.router.url('session.create'),
    });
  }
});

router.delete('session.destroy', '/', checkUser, async (ctx) => {
  ctx.session.currentUserId = null;
  ctx.redirect('/');
});

module.exports = router;
