import Router from 'koa-router';
import multer from '@koa/multer';

import * as fileCtrl from './file.ctrl';
import * as authorize from '../../lib/middlewares/authorize';

const chall = new Router();
const upload = multer({ dest: process.env.UPLOAD_DIR });

chall.post('/upload', authorize.admin, upload.single('file'), fileCtrl.upload);

export default chall;
