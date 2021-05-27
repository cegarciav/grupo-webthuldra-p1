async function userIdentificationUsers(ctx, next) {
  const { currentUser } = ctx.state;
  const idToCheck = ctx.request.params.id || ctx.request.body.id;
  const user = await ctx.orm.user.findByPk(idToCheck);

  if (currentUser.id !== user.id) ctx.throw(403);
  return next();
}

module.exports = {
  userIdentificationUsers,
};
