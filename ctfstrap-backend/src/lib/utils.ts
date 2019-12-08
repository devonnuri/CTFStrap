import { Context } from 'koa';
import { Schema } from '@hapi/joi';

export const validateBody = (ctx: Context, schema: Schema) => {
  const validation = schema.validate(ctx.request.body);
  if (validation.error) {
    ctx.status = 400;
    ctx.body = {
      name: 'WRONG_SCHEMA',
      payload: validation.error,
    };
    return false;
  }
  return true;
};

export const diffArray = <T>(
  before: T[],
  after: T[],
): { added: T[]; deleted: T[] } => ({
  deleted: before.filter(e => !after.includes(e)),
  added: after.filter(e => !before.includes(e)),
});
