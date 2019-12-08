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

@Table({ timestamps: false })
class Tag extends Model<Tag> {
  static getId = async (name: string) =>
    (
      (await Tag.findOne({
        where: { name: name.trim() },
      })) || (await Tag.build({ name: name.trim() }).save())
    ).id;

  static bulkGetId = async (names: string[]) =>
    Promise.all(names.map(name => Tag.getId(name)));

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
