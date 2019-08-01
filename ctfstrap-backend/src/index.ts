import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Helmet from 'koa-helmet';
import * as BodyParser from 'koa-bodyparser';
import * as dotenv from 'dotenv';

import * as database from './database';
import api from './routes';

dotenv.config();

const app = new Koa();
const router = new Router();

database.connect();

router.use('/api', api.routes());
app
  .use(Helmet())
  .use(BodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
