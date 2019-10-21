import Koa from 'koa';
import Router from 'koa-router';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import cors from '@koa/cors';

import * as database from './database';
import api from './routes';

dotenv.config();

interface KoaState {
  userId: number;
  isAdmin: boolean;
}

const app = new Koa<KoaState, {}>();
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
  .use(helmet())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Listening on port ${process.env.BACKEND_PORT}`);
});
