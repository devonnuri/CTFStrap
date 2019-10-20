import Router from 'koa-router';

import * as authCtrl from './chall.ctrl';
import * as authorize from '../../lib/middlewares/authorize';

const chall = new Router();

chall.get('/', authorize.login, authCtrl.viewAll);
chall.get('/:challId', authorize.login, authCtrl.view);
chall.post('/create', authorize.admin, authCtrl.create);
chall.post('/remove', authorize.admin, authCtrl.remove);
chall.post('/update', authorize.admin, authCtrl.update);
chall.post('/auth', authorize.login, authCtrl.auth);

export default chall;
