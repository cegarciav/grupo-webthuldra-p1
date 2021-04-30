const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('root', '/', async (ctx) => {
  let { page } = ctx.request.query;
  if (page && (isNaN(page) || Math.floor(page) !== +page || page < 1))
    return ctx.throw(404);

  if (!page)
    page = 1;
  else
    page = +page;

  const { count, rows } = await ctx.orm.post.findAndCountAll({
    offset: (page - 1) * 10,
    limit: page * 10,
    include: ctx.orm.user
  });
  if (rows.length === 0 && page !== 1)
    return ctx.throw(404);
  const pagesAmount = Math.ceil(count / 10);
  const pagesArray = [];
  for (let i = page; i > 0 && page - i < 4; i--)
    pagesArray.unshift(i);
  for (let i = page + 1; i <= pagesAmount && i - page < 4; i++)
    pagesArray.push(i);

  await ctx.render('index', {
    posts: rows,
    pagesArray,
    pagesAmount,
    postPath: (id) => ctx.router.url('CREAR RUTA DE POST', id)
  });
});

module.exports = router;
