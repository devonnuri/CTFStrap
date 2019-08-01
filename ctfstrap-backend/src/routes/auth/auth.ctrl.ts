import { Context } from 'koa';
import * as User from '../../database/models/User';
import { generateToken } from '../../lib/token';

export const login = async (ctx: Context) => {
  interface LoginSchema {
    name: string;
    password: string;
  }
};

export const register = async (ctx: Context) => {
  interface RegisterSchema {
    username: string;
    email: string;
    password: string;
  }

  const { username, email, password }: RegisterSchema = ctx.request.body;

  return User.findAny(username, email)
    .then(any => {
      if (any) {
        ctx.status = 409;
        ctx.body = {
          key: any.email === email ? 'email' : 'username',
        };

        throw new Error();
      }
    })
    .then(() => User.register(username, email, password))
    .then(({ id }) => {
      ctx.body = { id, username };

      return generateToken({ user: { id, username } }, 'user');
    })
    .then(accessToken => {
      ctx.cookies.set('access_token', accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    })
    .catch(err => {
      if (err.message) {
        ctx.status = 400;
        ctx.body = {
          name: 'WRONG_SCHEMA',
          payload: err.message,
        };
      }
    });
};
