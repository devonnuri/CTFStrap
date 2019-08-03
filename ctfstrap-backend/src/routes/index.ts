import * as Router from 'koa-router';
import auth from './auth';
import chall from './chall';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/chall', chall.routes());

export default api;
