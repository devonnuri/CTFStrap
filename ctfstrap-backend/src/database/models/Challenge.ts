import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import File from './File';
import Tag from './Tag';
import Hint from './Hint';
import Flag from './Flag';

@Table({ timestamps: false })
class Challenge extends Model<Challenge> {
  static existsId = async (id: number) =>
    (await Challenge.count({ where: { id } })) > 0

  static removeById = (id: number) => Challenge.destroy({ where: { id } });

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
    })) > 0

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
}

export default Challenge;
