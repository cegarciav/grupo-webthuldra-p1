const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('session.new', '/new', (ctx) => ctx.render(
  'session/new', {
    submitPath: ctx.router.url('session.create'),
  },
));

router.post('session.create', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email } });
  const authenticated = user && password === user.password;

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

router.delete('session.destroy', '/', async (ctx) => {
  ctx.session.currentUserId = null;
  ctx.redirect('/');
});

module.exports = router;
