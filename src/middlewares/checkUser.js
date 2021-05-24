function checkUser(ctx, next) {
  const { currentUser } = ctx.state;
  if (!currentUser)ctx.throw(401);
  return next();
}

module.exports = {
  checkUser,
};
