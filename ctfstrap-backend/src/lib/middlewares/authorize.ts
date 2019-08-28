import { Middleware, Context } from 'koa';
import { decodeToken } from '../token';
import User from '../../database/models/User';

const checkToken = async (ctx: Context) => {
  const token = ctx.cookies.get('access_token');

  if (!token) return false;

  try {
    const decoded: any = await decodeToken(token);
    const { user } = decoded;

    ctx.state.userId = user.id;
  } catch {
    ctx.state.userId = null;
  }
  return ctx.state.userId;
};

export const login: Middleware = async (ctx, next) => {
  if (!(await checkToken(ctx))) {
    ctx.status = 401;
    ctx.body = {
      name: 'NOT_AUTHORIZED',
    };
    return null;
  }
  return next();
};

export const admin: Middleware = async (ctx, next) => {
  const id = await checkToken(ctx);
  if (!id || (await User.count({ where: { id, admin: true } })) < 1) {
    ctx.status = 401;
    ctx.body = {
      name: 'NOT_AUTHORIZED',
    };
    return null;
  }
  return next();
};
