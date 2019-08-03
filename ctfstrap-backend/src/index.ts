import Koa from 'koa';
import Router from 'koa-router';
import Helmet from 'koa-helmet';
import BodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import cors from '@koa/cors';

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
