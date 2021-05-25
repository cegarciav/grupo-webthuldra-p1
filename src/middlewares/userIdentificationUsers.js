async function userIdentificationUsers(ctx, next) {
  const { currentUser } = ctx.state;
  const user = await ctx.orm.user.findByPk(ctx.request.params.id);

  if (currentUser.id !== user.id) ctx.throw(401);
  return next();
}

module.exports = {
  userIdentificationUsers,
};
