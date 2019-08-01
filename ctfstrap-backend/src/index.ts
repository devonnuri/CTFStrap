import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Helmet from 'koa-helmet';
import * as BodyParser from 'koa-bodyparser';
import * as dotenv from 'dotenv';
import * as cors from '@koa/cors';

import * as database from './database';
import api from './routes';

dotenv.config();

const app = new Koa();
const router = new Router();

database.connect();

router.use('/api', api.routes());
app
  .use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    }),
  )
  .use(Helmet())
  .use(BodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.BACKEND_PORT, () => {
  console.log('Listening on port ' + process.env.BACKEND_PORT);
});
