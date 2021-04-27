const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('users.list', '/', async (ctx) => {
  const usersList = await ctx.orm.user.findAll();
    await ctx.render('users/index', {
      usersList,
      notice: ctx.flashMessage.notice,
    });
  });

router.get('users.show', '/profile', async (ctx) => {
    await ctx.render('users/show', {
      notice: ctx.flashMessage.notice
    })
  })

module.exports = router;