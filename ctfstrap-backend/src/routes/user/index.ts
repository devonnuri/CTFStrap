import Router from 'koa-router';

import * as userCtrl from './user.ctrl';
import authorized from '../../lib/middlewares/authorized';

const chall = new Router();

chall.get('/solves', authorized, userCtrl.solves);
chall.get('/rank', userCtrl.rank);

export default chall;
