import { Context } from 'koa';

export const upload = async (ctx: Context) => {
  if (ctx.file) {
    ctx.body = ctx.file;
  } else {
    ctx.status = 500;
  }
};
