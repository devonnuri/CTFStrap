// @flow
import { Context } from 'koa';
import Joi from 'joi';

import Challenge from '../../database/models/Challenge';

export const register = async (ctx: Context) => {
  type RegisterSchema = {
    name: string,
    description: string,
    category: string,
    flag: string
  };

  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    flag: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = {
      name: 'WRONG_SCHEMA',
      payload: result.error
    };
    return;
  }

  const { name, description, category, flag }: RegisterSchema = ctx.request.body;

  try {
    const isExists = await Challenge.isExists(name);
    if (isExists) {
      ctx.status = 409;
      ctx.body = {
        key: 'name'
      };
      return;
    }

    const user = await Challenge.register(name, description, category, flag);

    ctx.body = {
      _id: user._id,
      name,
      description,
      category
    };
  } catch (err) {
    ctx.throw(err, 500);
  }
};

export const authFlag = (ctx: Context) => {
  // TODO: 이거 플래그 뿐만 아니라 코드 같은것도 넣어야 하니까 참고 하세영~!
  type AuthSchema = {
    challenge: number,
    flag: string
  };

  const schema = Joi.object({
    flag: Joi.string()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = {
      name: 'WRONG_SCHEMA',
      payload: result.error
    };
    return;
  }

  const { flag }: AuthSchema = ctx.request.body;
  // TODO: 확인 구문 넣어라
};
