const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

app.use((ctx) => {
    ctx.set('Access-Control-Allow-Origins', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET,POST');
});

router.get('/hello', (ctx) => {
    ctx.body = 'Hello World';
});

router.all('*', (ctx) => {
    ctx.body = 'You\'re Not Found';
});

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
