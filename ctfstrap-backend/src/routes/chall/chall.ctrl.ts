import { Context } from 'koa';
import * as Joi from '@hapi/joi';
import { Sequelize } from 'sequelize';

import { validateBody } from '../../lib/utils';
import Challenge from '../../database/models/Challenge';
import File from '../../database/models/File';
import Tag from '../../database/models/Tag';
import Hint from '../../database/models/Hint';
import Flag from '../../database/models/Flag';
import Submission from '../../database/models/Submission';
import User from '../../database/models/User';

export const listAll = async (ctx: Context) => Challenge.findAll({
  attributes: ['id', 'name', 'description', 'points', 'category', 'author'],
  include: [
    {
      model: File,
      attributes: ['filename', 'originalname'],
    },
    {
      model: Tag,
    },
  ],
}).then(challList => {
  ctx.body = challList;
});

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
    name: Joi.string(),
    description: Joi.string(),
    points: Joi.number()
      .integer(),
    category: Joi.string(),
    author: Joi.string(),
    files: Joi.array().items(
      Joi.object().keys({
        filename: Joi.string(),
        originalname: Joi.string(),
        path: Joi.string(),
        size: Joi.number(),
      }),
    ),
    tags: Joi.array().items(
      Joi.object().keys({
        name: Joi.string(),
      }),
    ),
    hints: Joi.array().items(
      Joi.object().keys({
        content: Joi.string(),
        cost: Joi.number().integer(),
      }),
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

  Challenge.create(
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
      files,
      tags,
      hints,
      flags,
    };
  });
};

export const remove = async (ctx: Context) => {
  interface RemoveSchema {
    challengeId: number;
  }

  const schema = Joi.object().keys({
    challengeId: Joi.number(),
  });

  if (!validateBody(ctx, schema)) return;

  const { challengeId }: RemoveSchema = ctx.request.body;

  Challenge.existsId(challengeId)
    .then(exists => {
      if (!exists) {
        ctx.status = 404;
        ctx.body = {
          name: 'CHALLENGE_NOT_FOUND',
        };
        throw new Error();
      }
      return Challenge.removeById(challengeId);
    })
    .then(() => {
      ctx.status = 204;
    })
    .catch(() => {
      if (!ctx.body) {
        ctx.status = 500;
      }
    });
};

export const update = async (ctx: Context) => {
  interface UpdateSchema {
    id: number;
    name?: string;
    description?: string;
    points?: number;
    category?: string;
    author?: string;
    files?: File[];
    tags?: Tag[];
    hints?: Hint[];
    flags?: Flag[];
  }

  const schema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string(),
    description: Joi.string(),
    points: Joi.number().integer(),
    category: Joi.string(),
    author: Joi.string(),
    files: Joi.array().items(
      Joi.object().keys({
        filename: Joi.string(),
        originalname: Joi.string(),
        path: Joi.string(),
        size: Joi.number(),
      }),
    ),
    tags: Joi.array().items(
      Joi.object().keys({
        name: Joi.string(),
      }),
    ),
    hints: Joi.array().items(
      Joi.object().keys({
        content: Joi.string(),
        cost: Joi.number().integer(),
      }),
    ),
    flags: Joi.array().items(Joi.object().keys({ content: Joi.string() })),
  });

  if (!validateBody(ctx, schema)) return;

  const {
    id,
    name,
    description,
    points,
    category,
    author,
    files,
    tags,
    hints,
    flags,
  }: UpdateSchema = ctx.request.body;

  Challenge.update({
    name, description, points, category, author, files, tags, hints, flags,
  }, { where: { id } });
};

export const auth = async (ctx: Context) => {
  interface AuthSchema {
    challengeId: number;
    flag: string;
  }

  const schema = Joi.object().keys({
    challengeId: Joi.number()
      .integer(),
    flag: Joi.string(),
  });

  if (!validateBody(ctx, schema)) return;

  const { challengeId, flag }: AuthSchema = ctx.request.body;

  Challenge.checkFlag(challengeId, flag)
    .then(result => {
      ctx.status = result ? 204 : 400;
      return Submission.create({
        userId: ctx.state.userId,
        ip: ctx.request.ip,
        challengeId,
        content: flag,
        result,
      });
    })
    .then(async submission => {
      if (submission.result) {
        Challenge.findOne({
          where: {
            id: challengeId,
          },
        }).then(challenge => User.update(
          {
            points: Sequelize.literal(`points + ${challenge.points}`),
            lastSolve: submission.submitTime,
          },
          {
            where: {
              id: ctx.state.userId,
            },
          },
        ));
      }
    });
};
