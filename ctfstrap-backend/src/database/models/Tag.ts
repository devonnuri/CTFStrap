import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  BelongsToMany,
} from 'sequelize-typescript';
import Challenge from './Challenge';
import ChallengeTag from './ChallengeTag';

@Table
class Tag extends Model<Tag> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @BelongsToMany(() => Challenge, () => ChallengeTag)
  challenges: Challenge[];
}

export default Tag;
