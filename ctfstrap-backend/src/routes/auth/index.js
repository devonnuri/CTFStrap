import Router from 'koa-router';

import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/login', authCtrl.login);
auth.get('/logout', authCtrl.logout);
auth.post('/register', authCtrl.register);

export default auth;
