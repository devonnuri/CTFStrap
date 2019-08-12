import { Context } from 'koa';
import Submission from '../../database/models/Submission';

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
