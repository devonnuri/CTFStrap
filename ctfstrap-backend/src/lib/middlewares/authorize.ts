import { Middleware, Context } from 'koa';
import { decodeToken, TokenPayload } from '../token';

const checkToken = async (ctx: Context) => {
  const token = ctx.cookies.get('access_token');

  if (!token) return false;

  try {
    const decoded: TokenPayload = await decodeToken(token);
    const {
      user: { id, admin },
    } = decoded;

    ctx.state.userId = id;
    ctx.state.isAdmin = admin;
  } catch {
    ctx.state.userId = null;
    ctx.state.isAdmin = false;
  }
  return ctx.state;
};

export const login: Middleware = async (ctx, next) => {
  const { userId } = await checkToken(ctx);
  if (!userId) {
    ctx.status = 401;
    ctx.body = {
      name: 'NOT_AUTHORIZED',
    };
    return null;
  }
  return next();
};

export const admin: Middleware = async (ctx, next) => {
  const { userId, isAdmin } = await checkToken(ctx);
  if (!userId || !isAdmin) {
    ctx.status = 401;
    ctx.body = {
      name: 'NOT_AUTHORIZED',
    };
    return null;
  }
  return next();
};
