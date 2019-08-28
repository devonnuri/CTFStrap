import Router from 'koa-router';

import * as userCtrl from './user.ctrl';
import * as authorize from '../../lib/middlewares/authorize';

const chall = new Router();

chall.get('/solves', authorize.login, userCtrl.solves);
chall.get('/rank', userCtrl.rank);

export default chall;
