import * as Router from 'koa-router';

import * as authCtrl from './chall.ctrl';
import authorized from '../../lib/middlewares/authorized';

const chall = new Router();

chall.get('/', authorized, authCtrl.listAll);
chall.post('/create', authorized, authCtrl.create);
chall.post('/remove', authorized, authCtrl.remove);
chall.post('/auth', authorized, authCtrl.auth);

export default chall;
