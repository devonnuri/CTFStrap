import { Context } from 'koa';
import Joi from '@hapi/joi';
import Submission from '../../database/models/Submission';
import User from '../../database/models/User';
import { validateBody } from '../../lib/utils';

export const list = (ctx: Context) =>
  User.findAll({
    attributes: ['id', 'username', 'email', 'points', 'admin', 'lastSolve'],
    include: [
      {
        model: Submission,
      },
    ],
  }).then(rankList => {
    ctx.body = rankList;
  });

export const solves = (ctx: Context) =>
  Submission.findAll({
    attributes: ['challengeId'],
    where: {
      userId: ctx.state.userId,
      result: true,
    },
  }).then(solveList => {
    ctx.body = solveList.map(e => e.challengeId);
  });

export const rank = (ctx: Context) =>
  User.findAll({
    attributes: ['username', 'points', 'lastSolve'],
    order: [['points', 'DESC'], ['lastSolve', 'ASC']],
  }).then(rankList => {
    ctx.body = rankList;
  });

export const remove = async (ctx: Context) => {
  interface RemoveSchema {
    userId: number;
  }

  const schema = Joi.object().keys({
    userId: Joi.number()
      .integer()
      .min(0),
  });

  if (!validateBody(ctx, schema)) return null;

  const { userId }: RemoveSchema = ctx.request.body;

  return User.destroy({ where: { id: userId } }).then(number => {
    if (number > 0) {
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = {
        name: 'USER_NOT_FOUND',
      };
    }
  });
};
