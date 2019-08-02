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
class Hint extends Model<Hint> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  content: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  cost: number;

  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @BelongsTo(() => Challenge)
  challenge: Challenge;
}

export default Hint;
