const KoaRouter = require('koa-router');

const index = require('./routes/index');
const users = require('./routes/users');
const posts = require('./routes/posts');

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
        userPath: (id) => id? ctx.router.url('users.show', id): '/'
    };
    return next();
});

router.use('/', index.routes());
router.use('/users', users.routes());
router.use('/posts', posts.routes());

module.exports = router;
