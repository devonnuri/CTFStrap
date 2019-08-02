import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import Challenge from './Challenge';

@Table
class Flag extends Model<Flag> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @BelongsTo(() => Challenge)
  challenge: Challenge;
}

export default Flag;
