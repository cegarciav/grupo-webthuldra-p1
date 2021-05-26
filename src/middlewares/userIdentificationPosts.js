async function userIdentificationPosts(ctx, next) {
  const { currentUser } = ctx.state;
  const post = await ctx.orm.post.findByPk(ctx.request.params.id);

  if (currentUser.id !== post.userId) ctx.throw(401);
  return next();
}

module.exports = {
  userIdentificationPosts,
};
