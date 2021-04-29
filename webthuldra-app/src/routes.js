const KoaRouter = require('koa-router');

const index = require('./routes/index');

const router = new KoaRouter();

router.use((ctx, next) => {
    ctx.state = {
        ...ctx.state,
        rootPath: (page) => {
            let queryOptions = {};
            if (page && page > 1)
                queryOptions.page = +page;
            return ctx.router.url('root', {}, { query: queryOptions });
        },
        userPath: () => ctx.router.url('CREAR RUTA PARA AUTOR', 1)
    };
    return next();
});

router.use('/', index.routes());

module.exports = router;
