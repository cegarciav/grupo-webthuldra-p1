const KoaRouter = require('koa-router');
const { ValidationError } = require('sequelize');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.comment = await ctx.orm.comment.findByPk(id, { include: ctx.orm.user });
  if (!ctx.state.comment) ctx.throw(404);
  return next();
});

router.post('comments.create', '/', async (ctx) => {
  const { _method, postId } = ctx.request.body;
  if (_method && _method === 'put') ctx.redirect(ctx.router.url('comments.modify'));
  if (_method && _method === 'delete') ctx.redirect(ctx.router.url('comments.remove'));

  ctx.request.body.userId = ctx.state.currentUser.id;
  const comment = ctx.orm.comment.build(ctx.request.body);
  try {
    await comment.save({
      fields: [
        'content',
        'postId',
        'userId',
      ],
    });
    ctx.redirect(ctx.router.url('posts.show', postId));
  } catch (e) {
    const post = await ctx.orm.post.findByPk(postId, { include: ctx.orm.user });
    const comments = await ctx.orm.comment.findAll({
      where: {
        postId: post.id,
      },
      include: ctx.orm.user,
    });
    await ctx.render('posts/show', {
      post,
      comments,
      submitCommentPath: ctx.router.url('comments.create'),
      notice: ctx.flashMessage.notice,
    });
  }
});

router.get('comments.update', '/:id/update', async (ctx) => {
  const { comment } = ctx.state;
  await ctx.render('comments/update', {
    comment,
    notice: ctx.flashMessage.notice,
    submitCommentPath: ctx.router.url('comments.create'),
    errors: ValidationError.errors,
  });
});

router.put('comments.modify', '/', async (ctx) => {
  const commentId = ctx.request.body.id;
  delete ctx.request.body.id;
  const comment = await ctx.orm.comment.findByPk(commentId);

  try {
    await ctx.orm.comment.update(ctx.request.body, {
      where: { id: commentId },
    });
    ctx.redirect(ctx.router.url('posts.show', comment.postId));
  } catch (e) {
    ctx.redirect(ctx.router.url('posts.show', comment.postId));
  }
});

router.get('comments.delete', '/:id/delete', async (ctx) => {
  const { comment } = ctx.state;
  await ctx.render('comments/delete', {
    comment,
    submitCommentPath: ctx.router.url('comments.create'),
    errors: ValidationError.errors,
  });
});

router.delete('comments.remove', '/', async (ctx) => {
  const commentId = ctx.request.body.id;
  const comment = await ctx.orm.comment.findByPk(commentId);
  const { postId } = comment;

  try {
    comment.destroy();
    ctx.redirect(ctx.router.url('posts.show', postId));
  } catch (e) {
    ctx.redirect(ctx.router.url('posts.show', postId));
  }
});

module.exports = router;
