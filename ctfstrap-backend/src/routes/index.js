import Router from 'koa-router';

import auth from './auth';
import challenge from './challenge';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/challenge', challenge.routes());

export default api;
