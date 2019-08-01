import { Middleware, Context } from 'koa';
import { decodeToken } from './../token';

const checkToken = async (ctx: Context) => {
  const token = ctx.cookies.get('access_token');

  if (!token) return false;

  try {
    const decoded: any = await decodeToken(token);
    const { user } = decoded;

    ctx.state.user_id = user.id;
  } catch {
    ctx.state.user_id = null;
    return false;
  }
  return true;
};

const authorized: Middleware = async (ctx, next) => {
  if (!(await checkToken(ctx))) {
    ctx.status = 401;
    ctx.body = {
      name: 'NOT_AUTHORIZED',
    };
    return null;
  }
  return next();
};

export default authorized;
