const KoaRouter = require('koa-router');

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

router.get('posts.show', '/:id', async (ctx) => {
  const {post} = ctx.state;
  await ctx.render('posts/show', {
      post,
      notice: ctx.flashMessage.notice
    });
  });
  
module.exports = router;