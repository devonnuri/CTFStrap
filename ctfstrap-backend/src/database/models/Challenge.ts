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
} from 'sequelize-typescript';
import { Sequelize } from 'sequelize';

import File from './File';
import Tag from './Tag';
import Hint from './Hint';
import Flag from './Flag';
import Submission from './Submission';
import User from './User';

@Table({ timestamps: false })
class Challenge extends Model<Challenge> {
  static checkFlag = async (challengeId: number, flag: string) =>
    (await Challenge.count({
      where: {
        id: challengeId,
      },
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
          {
            points: Sequelize.literal(`points + ${difference}`),
          },
          {
            where: {
              id: submission.userId,
            },
          },
        );
      });
    });

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

  @HasMany(() => Tag)
  tags: Tag[];

  @HasMany(() => Hint)
  hints: Hint[];

  @HasMany(() => Flag)
  flags: Flag[];

  @HasMany(() => Submission)
  submissions: Submission[];
}

export default Challenge;
