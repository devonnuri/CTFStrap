import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  HasMany,
  Default,
  BelongsToMany,
} from 'sequelize-typescript';
import { literal, Op } from 'sequelize';

import File from './File';
import ChallengeTag from './ChallengeTag';
import Tag from './Tag';
import Hint from './Hint';
import Flag from './Flag';
import Submission from './Submission';
import User from './User';

@Table({ timestamps: false })
class Challenge extends Model<Challenge> {
  static checkFlag = async (challengeId: number, flag: string) =>
    (await Challenge.count({
      where: { id: challengeId },
      include: [
        {
          model: Flag,
          where: { content: flag },
        },
      ],
    })) > 0;

  static remark = async (challengeId: number, difference: number) =>
    Submission.findAll({
      attributes: ['userId'],
      where: {
        challengeId,
        result: true,
      },
    }).then(submissions => {
      submissions.forEach(submission => {
        User.update(
          { points: literal(`points + ${difference}`) },
          { where: { id: submission.userId } },
        );
      });
    });

  linkFiles = async (fileIds: number[]) => {
    File.update(
      { challengeId: this.id },
      {
        where: {
          id: {
            [Op.or]: fileIds,
          },
        },
      },
    );
  };

  removeFiles = async () => {
    File.destroy({
      where: {
        challengeId: this.id,
      },
    });
  };

  getTags = async () => {
    return (await Challenge.findOne({
      include: [
        {
          model: Tag,
          attributes: ['name'],
        },
      ],
      where: {
        id: this.id,
      },
    })).tags;
  };

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Default('standard')
  @Column
  pointMode: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  points: number;

  @AllowNull(false)
  @Column
  category: string;

  @Column
  author: string;

  @HasMany(() => File)
  files: File[];

  @BelongsToMany(() => Tag, () => ChallengeTag)
  tags: Tag[];

  @HasMany(() => Hint)
  hints: Hint[];

  @HasMany(() => Flag)
  flags: Flag[];

  @HasMany(() => Submission)
  submissions: Submission[];
}

export default Challenge;
