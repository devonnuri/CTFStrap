import {
  Table, Model, ForeignKey, Column,
} from 'sequelize-typescript';
import Challenge from './Challenge';
import Tag from './Tag';

@Table
class ChallengeTag extends Model<ChallengeTag> {
  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;
}

export default ChallengeTag;
