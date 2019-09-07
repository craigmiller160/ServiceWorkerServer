const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

router.get('/hello', (ctx) => {
    ctx.body = 'Hello World';
});

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
