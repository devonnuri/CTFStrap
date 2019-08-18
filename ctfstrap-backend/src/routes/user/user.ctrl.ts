import { Context } from 'koa';
import { Sequelize } from 'sequelize';
import Submission from '../../database/models/Submission';
import User from '../../database/models/User';

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
