import Router from 'koa-router';

import * as userCtrl from './user.ctrl';
import authorized from '../../lib/middlewares/authorized';

const chall = new Router();

chall.get('/solves', authorized, userCtrl.solves);

export default chall;
