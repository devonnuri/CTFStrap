import { Context } from 'koa';
import Joi, { SchemaLike } from 'joi';

export const validateBody = (ctx: Context, schema: SchemaLike) => {
  const validation = Joi.validate(ctx.request.body, schema);
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
