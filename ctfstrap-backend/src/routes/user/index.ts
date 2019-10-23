import Router from 'koa-router';

import * as userCtrl from './user.ctrl';
import * as authorize from '../../lib/middlewares/authorize';

const chall = new Router();

chall.get('/', authorize.admin, userCtrl.list);
chall.get('/solves', authorize.login, userCtrl.solves);
chall.get('/rank', userCtrl.rank);
chall.post('/remove', authorize.admin, userCtrl.remove);

export default chall;
