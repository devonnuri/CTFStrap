import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';

import api from './routes';
import Database from './database';

dotenv.config();

const app = new Koa();
const router = new Router();
const database = new Database();

database.connect();

router.use('/api', api.routes());
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
