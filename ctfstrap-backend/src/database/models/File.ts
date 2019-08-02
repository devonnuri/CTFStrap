import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Challenge from './Challenge';

@Table
class File extends Model<File> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  location: string;

  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @BelongsTo(() => Challenge)
  challenge: Challenge;
}

export default File;
