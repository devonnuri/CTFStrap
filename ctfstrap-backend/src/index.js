import Koa from 'koa';
import dotenv from 'dotenv';

import router from './router';

dotenv.config();

const { PORT: port } = process.env;

const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`CTFStrap Backend Server is now running at port ${port}`);
});
