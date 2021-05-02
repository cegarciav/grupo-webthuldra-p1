const KoaRouter = require('koa-router');
const { ValidationError } = require('sequelize');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.post = await ctx.orm.post.findByPk(ctx.params.id);
  if (!ctx.state.post) ctx.throw(404);
  return next();
});

router.get('posts.list', '/', async (ctx) => {
  let { page } = ctx.request.query;
  if (page && (isNaN(page) || Math.floor(page) !== +page || page < 1))
    return ctx.throw(404);

  if (!page)
    page = 1;
  else
    page = +page;

  const { count, rows } = await ctx.orm.post.findAndCountAll({
    offset: (page - 1) * 10,
    limit: page * 10
  });

  if (rows.length === 0 && page !== 1)
    return ctx.throw(404);
  const pagesAmount = Math.ceil(count / 10);
  const pagesArray = [];
  for (let i = page; i > 0 && page - i < 4; i--)
    pagesArray.unshift(i);
  for (let i = page + 1; i <= pagesAmount && i - page < 4; i++)
    pagesArray.push(i);

  await ctx.render('posts/index', {
    postsList: rows,
    pagesArray,
    pagesAmount,
    notice: ctx.flashMessage.notice,
  });
});

router.get('posts.new', '/new', async (ctx) => {
  await ctx.render('posts/new', {
      errors: ValidationError.errors,
      submitPostPath: ctx.router.url('posts.create'),
    });
});


router.get('posts.show', '/:id', async (ctx) => {
  const {post} = ctx.state;
  await ctx.render('posts/show', {
      post,
      notice: ctx.flashMessage.notice
    });
});

router.post('posts.create', '/', async(ctx) => {
  const method = ctx.request.body._method;
  if (method && method === 'put')
    ctx.redirect(ctx.router.url('posts.modify'));
  
  const mediaUrl = ctx.request.body.media;
  if (!mediaUrl)
    delete ctx.request.body.media;
  
  const post = ctx.orm.post.build(ctx.request.body);
  try {
    await post.save({ fields: [
      'caption', 
      'media', 
      'postId'
    ] });
    ctx.redirect(ctx.router.url('posts.list'));
  } catch (ValidationError) {
    await ctx.render('posts/new', {
      errors: ValidationError.errors,
      submitPostPath: ctx.router.url('posts.create'),
    });
  }
});

router.get('posts.update', '/:id/update', async(ctx) => {
  const {post} = ctx.state;
  await ctx.render('posts/update', {
    post,
    submitPostPath: ctx.router.url('posts.create'),
    errors: ValidationError.errors
  });
});

router.put('posts.modify', '/', async(ctx) => {
  const postId = ctx.request.body.id;
  delete ctx.request.body._method;
  delete ctx.request.body.id;

  const mediaUrl = ctx.request.body.media;
  if (!mediaUrl)
    delete ctx.request.body.media;

  try {
    const post = await ctx.orm.post.update(ctx.request.body, {
      where: { id: postId }
    });
    ctx.redirect(ctx.router.url('posts.show', postId));
  }
  catch (ValidationError) {
    await ctx.render('post/update', {
      errors: ValidationError.errors,
      submitPostPath: ctx.router.url('posts.create'),
    });
  }
});

router.get('posts.update', '/:id/update', async(ctx) => {
  const {post} = ctx.state;
  await ctx.render('posts/update', {
    post,
    submitpostPath: ctx.router.url('posts.create'),
    errors: ValidationError.errors
  });
});

router.put('posts.modify', '/', async(ctx) => {
  const postId = ctx.request.body.id;
  delete ctx.request.body._method;
  delete ctx.request.body.id;

  const pictureUrl = ctx.request.body.picture;
  if (!pictureUrl)
    delete ctx.request.body.picture;

  try {
    const post = await ctx.orm.post.update(ctx.request.body, {
      where: { id: postId }
    });
    ctx.redirect(ctx.router.url('posts.show', postId));
  }
  catch (ValidationError) {
    await ctx.render('posts/update', {
      errors: ValidationError.errors,
      submitpostPath: ctx.router.url('posts.create'),
    });
  }
});

router.get('posts.delete', '/:id/delete', async(ctx) => {
  const {post} = ctx.state;
  await ctx.render('posts/delete', {
    post,
    submitpostPath: ctx.router.url('posts.create'),
    errors: ValidationError.errors
  });
});

router.delete('posts.remove', '/', async(ctx) => {
  const postId = ctx.request.body.id;
  
  try {
    const post = ctx.state.post = await ctx.orm.post.findByPk(postId);
    post.destroy();
    ctx.redirect(ctx.router.url('posts.list'));
  }
  catch (ValidationError) {
    await ctx.render('posts/delete', {
      errors: ValidationError.errors,
      submitpostPath: ctx.router.url('posts.create'),
    });
  }
});

module.exports = router;