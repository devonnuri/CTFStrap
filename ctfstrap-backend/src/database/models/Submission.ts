import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Column,
  ForeignKey,
  CreatedAt,
  BelongsTo,
  DataType,
  HasOne,
} from 'sequelize-typescript';
import Challenge from './Challenge';
import User from './User';

@Table({ timestamps: false })
class Submission extends Model<Submission> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @AllowNull(false)
  @Column
  ip: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @AllowNull(false)
  @Column
  result: boolean;

  @CreatedAt
  createdAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Challenge)
  challenge: Challenge;
}

export default Submission;
