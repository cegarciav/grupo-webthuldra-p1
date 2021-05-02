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
        userPath: (id) => id? ctx.router.url('users.show', id): '/',
        usersPath: (page) => {
            let queryOptions = {};
            if (page && page > 1)
                queryOptions.page = +page;
            return ctx.router.url('users.list', {}, { query: queryOptions });
        },
        newUserPath: () => ctx.router.url('users.new'),
        updateUserPath: (id) => ctx.router.url('users.update', id),
        deleteUserPath: (id) => ctx.router.url('users.delete', id),
        parseDate: (dateString) => {
            const dateObject = new Date(dateString);
            const day = dateObject.getDay();
            const month = dateObject.getMonth();
            const year = dateObject.getFullYear();
            return `${(day<10)?('0' + day): day}-${(month<10)?('0' + month): month}-${year}`;
        },
        postPath: (id) => id? ctx.router.url('posts.show', id): '/',
        postsPath: (page) => {
            let queryOptions = {};
            if (page && page > 1)
                queryOptions.page = +page;
            return ctx.router.url('posts.list', {}, { query: queryOptions });
        },
        newPostPath: () => ctx.router.url('posts.new'),
        updatePostPath: (id) => ctx.router.url('posts.update', id),
        deletePostPath: (id) => ctx.router.url('posts.delete', id),
    };
    return next();
});

router.use('/', index.routes());
router.use('/users', users.routes());
router.use('/posts', posts.routes());

module.exports = router;
