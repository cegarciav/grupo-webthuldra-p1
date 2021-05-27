async function userIdentificationComments(ctx, next) {
  const { currentUser } = ctx.state;
  const idToCheck = ctx.request.params.id || ctx.request.body.id;
  const comment = await ctx.orm.comment.findByPk(idToCheck);

  if (currentUser.id !== comment.userId) ctx.throw(403);
  return next();
}

module.exports = {
  userIdentificationComments,
};
