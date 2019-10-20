import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Challenge from './Challenge';

@Table({ timestamps: false })
class Tag extends Model<Tag> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @Column
  name: string;

  @BelongsTo(() => Challenge)
  challenge: Challenge;
}

export default Tag;
