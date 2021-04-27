const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('posts.list', '/', async (ctx) => {
  const postsList = await ctx.orm.post.findAll();
    await ctx.render('posts/index', {
      postsList,
      notice: ctx.flashMessage.notice,
    });
  });

  
module.exports = router;