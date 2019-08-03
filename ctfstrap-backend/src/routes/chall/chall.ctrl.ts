import { Context } from 'koa';
import Challenge from '../../database/models/Challenge';

export const listAll = async (ctx: Context) => {
  return Challenge.findAll({
    attributes: ['id', 'name', 'description', 'points', 'category', 'author'],
  }).then(challList => {
    ctx.body = challList;
  });
};

export const create = async (ctx: Context) => {
  interface CreateSchema {
    name: string;
    description: string;
    points: number;
    category: string;
    author?: string;
  }

  const {
    name,
    description,
    points,
    category,
    author,
  }: CreateSchema = ctx.request.body;

  return Challenge.create({
    name,
    description,
    points,
    category,
    author,
  })
    .then(({ id }) => {
      ctx.body = {
        id,
        name,
        description,
        points,
        category,
        author,
      };
    })
    .catch(error => {
      if (error.message) {
        ctx.status = 400;
        ctx.body = {
          name: 'WRONG_SCHEMA',
          payload: error.message,
        };
      } else {
        ctx.status = 500;
      }
    });
};

export const remove = (ctx: Context) => {};
export const auth = (ctx: Context) => {};
