import Router from 'koa-router';
import auth from './auth';
import chall from './chall';
import file from './file';
import user from './user';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/chall', chall.routes());
api.use('/file', file.routes());
api.use('/user', user.routes());

export default api;
