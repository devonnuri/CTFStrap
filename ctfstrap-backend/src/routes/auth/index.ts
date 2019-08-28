import Router from 'koa-router';

import * as authCtrl from './auth.ctrl';
import * as authorize from '../../lib/middlewares/authorize';

const auth = new Router();

auth.post('/login', authCtrl.login);
auth.get('/logout', authCtrl.logout);
auth.post('/register', authCtrl.register);
auth.get('/check', authorize.login, authCtrl.check);

export default auth;
