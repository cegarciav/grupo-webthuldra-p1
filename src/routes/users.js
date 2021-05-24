const KoaRouter = require('koa-router');
const { ValidationError } = require('sequelize');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.user = await ctx.orm.user.findByPk(id, { include: ctx.orm.post });
  if (!ctx.state.user) ctx.throw(404);
  return next();
});

router.get('users.list', '/', async (ctx) => {
  let { page } = ctx.request.query;
  if (page && (Number.isNaN(page) || Math.floor(page) !== +page || page < 1)) return ctx.throw(404);

  if (!page) page = 1;
  else page = +page;

  const { count, rows } = await ctx.orm.user.findAndCountAll({
    offset: (page - 1) * 10,
    limit: page * 10,
  });

  if (rows.length === 0 && page !== 1) return ctx.throw(404);
  const pagesAmount = Math.ceil(count / 10);
  const pagesArray = [];
  for (let i = page; i > 0 && page - i < 4; i -= 1) pagesArray.unshift(i);
  for (let i = page + 1; i <= pagesAmount && i - page < 4; i += 1) pagesArray.push(i);

  return ctx.render('users/index', {
    usersList: rows,
    pagesArray,
    pagesAmount,
    notice: ctx.flashMessage.notice,
  });
});

router.get('users.new', '/new', async (ctx) => {
  const user = ctx.orm.user.build();
  await ctx.render('users/new', {
    user,
    errors: ValidationError.errors,
    submitUserPath: ctx.router.url('users.create'),
  });
});

router.get('users.show', '/:id', async (ctx) => {
  const { user } = ctx.state;
  await ctx.render('users/show', {
    user,
    notice: ctx.flashMessage.notice,
  });
});

router.post('users.create', '/', async (ctx) => {
  const { _method } = ctx.request.body;
  if (_method && _method === 'put') ctx.redirect(ctx.router.url('users.modify'));

  if (_method && _method === 'delete') ctx.redirect(ctx.router.url('users.remove'));

  const pictureUrl = ctx.request.body.picture;
  if (!pictureUrl) delete ctx.request.body.picture;

  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save({
      fields: [
        'lastName',
        'firstName',
        'email',
        'tag',
        'password',
        'description',
        'picture',
      ],
    });
    ctx.redirect(ctx.router.url('users.list'));
  } catch (e) {
    await ctx.render('users/new', {
      user,
      errors: e.errors,
      submitUserPath: ctx.router.url('users.create'),
    });
  }
});

router.get('users.update', '/:id/update', async (ctx) => {
  const { user } = ctx.state;
  await ctx.render('users/update', {
    user,
    submitUserPath: ctx.router.url('users.create'),
    errors: ValidationError.errors,
  });
});

router.put('users.modify', '/', async (ctx) => {
  const userId = ctx.request.body.id;
  delete ctx.request.body.id;

  const pictureUrl = ctx.request.body.picture;
  if (!pictureUrl) ctx.request.body.picture = null;

  try {
    await ctx.orm.user.update(ctx.request.body, {
      where: { id: userId },
    });
    ctx.redirect(ctx.router.url('users.show', userId));
  } catch (e) {
    await ctx.render('users/update', {
      errors: e.errors,
      submitUserPath: ctx.router.url('users.create'),
    });
  }
});

router.get('users.delete', '/:id/delete', async (ctx) => {
  const { user } = ctx.state;
  await ctx.render('users/delete', {
    user,
    submitUserPath: ctx.router.url('users.create'),
    errors: ValidationError.errors,
  });
});

router.delete('users.remove', '/', async (ctx) => {
  const userId = ctx.request.body.id;

  try {
    const user = await ctx.orm.user.findByPk(userId);
    user.destroy();
    ctx.redirect(ctx.router.url('users.list'));
  } catch (e) {
    await ctx.render('users/delete', {
      errors: e.errors,
      submitUserPath: ctx.router.url('users.create'),
    });
  }
});

module.exports = router;
