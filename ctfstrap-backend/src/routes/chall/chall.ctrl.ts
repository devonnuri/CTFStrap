import { Context } from 'koa';
import Joi from '@hapi/joi';
import { literal } from 'sequelize';

import { validateBody, diffArray } from '../../lib/utils';
import Challenge from '../../database/models/Challenge';
import ChallengeTag from '../../database/models/ChallengeTag';
import File from '../../database/models/File';
import Tag from '../../database/models/Tag';
import Hint from '../../database/models/Hint';
import Flag from '../../database/models/Flag';
import Submission from '../../database/models/Submission';
import User from '../../database/models/User';

export const viewAll = async (ctx: Context) =>
  Challenge.findAll({
    attributes: ['id', 'name', 'description', 'points', 'category', 'author'],
    include: [
      {
        model: File,
        attributes: ['filename', 'originalname'],
      },
      {
        model: Tag,
        attributes: ['name'],
      },
      ...(ctx.state.isAdmin
        ? [
            {
              model: Flag,
              attributes: ['content'],
            },
            {
              model: Hint,
              attributes: ['content', 'cost'],
            },
          ]
        : []),
    ],
  }).then(challList => {
    ctx.body = challList;
  });

export const view = async (ctx: Context) =>
  Challenge.findOne({
    attributes: ['id', 'name', 'description', 'points', 'category', 'author'],
    include: [
      {
        model: File,
        attributes: ['id', 'filename', 'originalname'],
      },
      {
        model: Tag,
        attributes: ['name'],
      },
      ...(ctx.state.isAdmin
        ? [
            {
              model: Flag,
              attributes: ['content'],
            },
            {
              model: Hint,
              attributes: ['content', 'cost'],
            },
          ]
        : []),
    ],
    where: { id: ctx.params.challId },
  }).then(challenge => {
    if (challenge) {
      ctx.body = challenge;
    } else {
      ctx.status = 404;
      ctx.body = {
        name: 'CHALLENGE_NOT_FOUND',
      };
    }
  });

export const create = async (ctx: Context) => {
  interface CreateSchema {
    name: string;
    description: string;
    points: number;
    category: string;
    author?: string;
    files?: { id: number }[];
    tags?: Tag[];
    hints?: Hint[];
    flags?: Flag[];
  }

  const schema = Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    points: Joi.number()
      .integer()
      .min(0),
    category: Joi.string(),
    author: Joi.string(),
    files: Joi.array().items(
      Joi.object().keys({
        id: Joi.number()
          .integer()
          .min(0)
          .required(),
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
        cost: Joi.number()
          .integer()
          .min(0),
      }),
    ),
    flags: Joi.array().items(Joi.object().keys({ content: Joi.string() })),
  });

  if (!validateBody(ctx, schema)) return null;

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

  console.log(await File.bulkFindById(files.map(e => e.id)));

  return Challenge.create(
    {
      name,
      description,
      points,
      category,
      author,
      tags,
      hints,
      flags,
    },
    {
      include: [Tag, Hint, Flag],
    },
  )
    .then(chall => {
      chall.linkFiles(files.map(e => e.id));
      return chall;
    })
    .then(({ id }) => {
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
    challengeId: Joi.number()
      .integer()
      .min(0),
  });

  if (!validateBody(ctx, schema)) return null;

  const { challengeId }: RemoveSchema = ctx.request.body;

  return Challenge.destroy({ where: { id: challengeId } }).then(
    async number => {
      if (number > 0) {
        const challenge = await Challenge.findOne({
          where: { id: challengeId },
        });
        challenge.removeFiles();

        ctx.status = 204;
      } else {
        ctx.status = 404;
        ctx.body = {
          name: 'CHALLENGE_NOT_FOUND',
        };
      }
    },
  );
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
    id: Joi.number()
      .integer()
      .min(0),
    name: Joi.string(),
    description: Joi.string(),
    points: Joi.number()
      .integer()
      .min(0),
    category: Joi.string(),
    author: Joi.string(),
    files: Joi.array().items(
      Joi.object().keys({
        id: Joi.number()
          .integer()
          .min(0)
          .required(),
      }),
    ),
    tags: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
      }),
    ),
    hints: Joi.array().items(
      Joi.object().keys({
        content: Joi.string().required(),
        cost: Joi.number()
          .integer()
          .min(0)
          .required(),
      }),
    ),
    flags: Joi.array().items(Joi.object().keys({ content: Joi.string() })),
  });

  if (!validateBody(ctx, schema)) return null;

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

  const challenge = await Challenge.findOne({
    include: [File],
    where: { id },
  });

  if (files) {
    const { removed, added } = diffArray(
      challenge.files.map(e => e.id),
      files.map(e => e.id),
    );

    console.log('removed', removed);
    console.log('added', added);

    File.bulkDestroy(removed);
    challenge.linkFiles(added);
  }

  if (tags) {
    const currentTags = await challenge.getTags();
    const { removed, added } = diffArray(
      currentTags.map(e => e.name),
      tags.map(e => e.name),
    );

    await ChallengeTag.removeTagsFromChallenge(id, removed);
    await ChallengeTag.addTagsFromChallenge(id, added);
  }

  return Challenge.update(
    {
      name,
      description,
      points,
      category,
      author,
      files,
      hints,
      flags,
    },
    { where: { id } },
  )
    .then(() => {
      ctx.body = {
        id,
        name,
        description,
        points,
        category,
        author,
        files,
        hints,
        flags,
      };
    })
    .catch(() => {
      ctx.status = 500;
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
      .min(0),
    flag: Joi.string(),
  });

  if (!validateBody(ctx, schema)) return null;

  const { challengeId, flag }: AuthSchema = ctx.request.body;

  return Challenge.checkFlag(challengeId, flag)
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
        return Challenge.findOne({
          where: {
            id: challengeId,
          },
        }).then(challenge =>
          User.update(
            {
              points: literal(`points + ${challenge.points}`),
              lastSolve: submission.submitTime,
            },
            {
              where: {
                id: ctx.state.userId,
              },
            },
          ),
        );
      }
      return null;
    });
};
