import Router from 'koa-router';
import multer from '@koa/multer';
import { randomBytes } from 'crypto';
import mkdirp from 'mkdirp';

import * as fileCtrl from './file.ctrl';
import * as authorize from '../../lib/middlewares/authorize';

const file = new Router();
const upload = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    mkdirp(process.env.UPLOAD_DIR, err => cb(err, process.env.UPLOAD_DIR));
  },
  filename: (req, file, cb) => {
    cb(null, randomBytes(16).toString('hex'));
  },
})});

file.post('/upload', authorize.admin, upload.single('file'), fileCtrl.upload);
file.post('/remove', authorize.admin, fileCtrl.remove);

export default file;
