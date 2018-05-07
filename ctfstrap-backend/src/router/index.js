// @flow
import Router from 'koa-router';
import { Context } from 'koa';

const router: Router = new Router();

router.get('/test', (ctx: Context) => {
  ctx.body = 'hello world';
});

module.exports = router;
