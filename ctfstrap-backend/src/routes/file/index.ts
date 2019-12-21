import Router from 'koa-router';
import multer from '@koa/multer';
import { randomBytes } from 'crypto';
import mkdirp from 'mkdirp';

import * as fileCtrl from './file.ctrl';
import * as authorize from '../../lib/middlewares/authorize';

const file = new Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _f, cb) => {
      mkdirp(process.env.UPLOAD_DIR, err => cb(err, process.env.UPLOAD_DIR));
    },
    filename: (_req, _f, cb) => {
      cb(null, randomBytes(16).toString('hex'));
    },
  }),
});

file.get('/download/:filename', authorize.login, fileCtrl.download);
file.post(
  '/upload',
  authorize.admin,
  fileCtrl.preupload,
  upload.single('file'),
  fileCtrl.upload,
);
file.post('/remove', authorize.admin, fileCtrl.remove);

export default file;
