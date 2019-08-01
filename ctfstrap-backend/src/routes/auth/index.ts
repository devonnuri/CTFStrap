import * as Router from 'koa-router';

import * as authCtrl from './auth.ctrl';
import authorized from '../../lib/middlewares/authorized';

const auth = new Router();

auth.post('/login', authCtrl.login);
auth.get('/logout', authCtrl.logout);
auth.post('/register', authCtrl.register);
auth.get('/check', authorized, authCtrl.check);

export default auth;
