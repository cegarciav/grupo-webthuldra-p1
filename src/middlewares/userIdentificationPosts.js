async function userIdentificationPosts(ctx, next) {
  const { currentUser } = ctx.state;
  const idToCheck = ctx.request.params.id || ctx.request.body.id;
  const post = await ctx.orm.post.findByPk(idToCheck);

  if (currentUser.id !== post.userId) ctx.throw(403);
  return next();
}

module.exports = {
  userIdentificationPosts,
};
