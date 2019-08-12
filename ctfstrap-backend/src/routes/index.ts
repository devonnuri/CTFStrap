import Router from 'koa-router';
import auth from './auth';
import chall from './chall';
import user from './user';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/chall', chall.routes());
api.use('/user', user.routes());

export default api;
