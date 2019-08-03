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

  @Column
  content: string;

  @Column(DataType.INTEGER)
  cost: number;

  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @BelongsTo(() => Challenge)
  challenge: Challenge;
}

export default Hint;
