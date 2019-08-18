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
  Default,
} from 'sequelize-typescript';
import Sequelize from 'sequelize';
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
  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column
  submitTime: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Challenge)
  challenge: Challenge;
}

export default Submission;
