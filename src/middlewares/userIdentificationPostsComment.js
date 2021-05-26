async function userIdentificationComments(ctx, next) {
  const { currentUser } = ctx.state;
  const comment = await ctx.orm.comment.findByPk(ctx.request.params.id);

  if (currentUser.id !== comment.userId) ctx.throw(401);
  return next();
}

module.exports = {
  userIdentificationComments,
};
