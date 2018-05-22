import Router from 'koa-router';

import * as challengeCtrl from './challenge.ctrl';

const auth = new Router();

auth.post('/register', challengeCtrl.register);
auth.post('/authflag', challengeCtrl.authFlag);

export default auth;
