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

@Table
class Challenge extends Model<Challenge> {
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

  @AllowNull(true)
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
