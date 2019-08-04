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
} from 'sequelize-typescript';
import Challenge from './Challenge';
import User from './User';

@Table({ timestamps: false })
class Submission extends Model<Submission> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @AllowNull(false)
  @Column
  ip: string;

  @AllowNull(false)
  @Column
  content: string;

  @CreatedAt
  createdAt: Date;

  @BelongsTo(() => Challenge)
  challenge: Challenge;

  @BelongsTo(() => User)
  user: User;
}

export default Submission;
