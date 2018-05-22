// @flow
import { Context } from 'koa';
import Joi from 'joi';

import User from '../../database/models/User';

export const register = async (ctx: Context) => {
  type RegisterSchema = {
    username: string,
    email: string,
    password: string
  };

  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
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

  const { username, email, password }: RegisterSchema = ctx.request.body;

  try {
    const isExists = await User.isExists(username, email);
    if (isExists) {
      ctx.status = 409;
      ctx.body = {
        key: isExists.email === email ? 'email' : 'username'
      };
      return;
    }

    const user = await User.register(username, email, password);

    ctx.body = {
      _id: user._id,
      username
    };

    const accessToken = await user.generateToken();

    // configure accessToken to httpOnly cookie
    ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
  } catch (err) {
    ctx.throw(err, 500);
  }
};

export const login = async (ctx: Context) => {
  type LoginSchema = {
    email: string,
    password: string
  };

  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
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

  const { email, password }: LoginSchema = ctx.request.body;

  try {
    const user = await User.findUser('email', email);

    if (!user) {
      ctx.status = 403;
      ctx.body = {
        name: 'WRONG_CREDENTIALS'
      };
      return;
    }

    if (!user.validatePassword(password)) {
      ctx.status = 403;
      ctx.body = {
        name: 'WRONG_CREDENTIALS'
      };
      return;
    }

    const accessToken = await user.generateToken();

    ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    const { _id, username } = user;

    ctx.body = { _id, username };
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export const logout = async (ctx: Context) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
};
