import { Context } from 'koa';
import * as Joi from 'joi';
import { validateBody } from './../../lib/utils';
import Challenge from '../../database/models/Challenge';
import File from '../../database/models/File';
import Tag from '../../database/models/Tag';
import Hint from '../../database/models/Hint';
import Flag from '../../database/models/Flag';
import Submission from '../../database/models/Submission';

export const listAll = async (ctx: Context) => {
  return Challenge.findAll({
    attributes: ['id', 'name', 'description', 'points', 'category', 'author'],
    include: [
      {
        model: File,
        attributes: ['location'],
      },
      {
        model: Tag,
      },
    ],
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
    files?: File[];
    tags?: Tag[];
    hints?: Hint[];
    flags?: Flag[];
  }

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    points: Joi.number()
      .integer()
      .required(),
    category: Joi.string().required(),
    author: Joi.string(),
    files: Joi.array().items(Joi.object().keys({ location: Joi.string() })),
    tags: Joi.array().items(Joi.object().keys({ name: Joi.string() })),
    hints: Joi.array().items(
      Joi.object().keys({ content: Joi.string(), cost: Joi.number().integer() }),
    ),
    flags: Joi.array().items(Joi.object().keys({ content: Joi.string() })),
  });

  if (!validateBody(ctx, schema)) return;

  const {
    name,
    description,
    points,
    category,
    author,
    files,
    tags,
    hints,
    flags,
  }: CreateSchema = ctx.request.body;

  return Challenge.create(
    {
      name,
      description,
      points,
      category,
      author,
      files,
      tags,
      hints,
      flags,
    },
    {
      include: [File, Tag, Hint, Flag],
    },
  ).then(({ id }) => {
    ctx.body = {
      id,
      name,
      description,
      points,
      category,
      author,
    };
  });
};

export const remove = async (ctx: Context) => {
  interface RemoveSchema {
    id: number;
  }

  const schema = Joi.object().keys({
    id: Joi.number()
      .integer()
      .required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { id }: RemoveSchema = ctx.request.body;

  return Challenge.existsId(id)
    .then(exists => {
      if (!exists) {
        ctx.status = 404;
        ctx.body = {
          name: 'CHALLENGE_NOT_FOUND',
        };
        throw new Error();
      }
      return Challenge.removeById(id);
    })
    .then(() => {
      ctx.status = 204;
    });
};

export const auth = async (ctx: Context) => {
  interface AuthSchema {
    challengeId: number;
    flag: string;
  }

  const schema = Joi.object().keys({
    challengeId: Joi.number()
      .integer()
      .required(),
    flag: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { challengeId, flag }: AuthSchema = ctx.request.body;

  return Challenge.checkFlag(challengeId, flag).then(result => {
    ctx.status = result ? 204 : 400;
    return Submission.create({
      userId: ctx.state.userId,
      ip: ctx.request.ip,
      challengeId,
      content: flag,
      result,
    });
  });
};
