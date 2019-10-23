import { Context } from 'koa';
import Joi from '@hapi/joi';
import { normalize } from 'path';
import { validateBody } from '../../lib/utils';

import File from '../../database/models/File';

export const download = async (ctx: Context) => {
  const { filename } = ctx.params;

  return File.findOne({ where: { filename } })
    .then(file => {
      if (file.size < 1) {
        ctx.status = 404;
        ctx.body = {
          name: 'FILE_NOT_FOUND',
        };
        throw new Error();
      }
      ctx.status = 204;
      ctx.attachment(normalize(`${__dirname}/../../../${file.path}`));
    })
    .catch(() => {
      if (!ctx.body) {
        ctx.status = 500;
      }
    });
};

export const preupload = async (ctx: Context, next: () => Promise<any>) => {
  const schema = Joi.object().keys({
    file: Joi.binary(),
  });

  if (!validateBody(ctx, schema)) return null;

  return next;
};

export const upload = async (ctx: Context) => {
  if (ctx.file) {
    const { filename, originalname, path, size } = ctx.file;
    ctx.body = {
      filename,
      originalname,
      path,
      size,
    };
  } else {
    ctx.status = 500;
  }
};

export const remove = async (ctx: Context) => {
  interface RemoveSchema {
    filename: string;
  }

  const schema = Joi.object().keys({
    filename: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return null;

  const { filename }: RemoveSchema = ctx.request.body;

  return File.destroy({ where: { filename } }).then(number => {
    if (number > 0) {
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = {
        name: 'FILE_NOT_FOUND',
      };
    }
  });
};
