import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Op } from 'sequelize';
import Challenge from './Challenge';
import Tag from './Tag';

@Table({ timestamps: false })
class ChallengeTag extends Model<ChallengeTag> {
  static addTagsFromChallenge = async (challengeId: number, tags: string[]) =>
    ChallengeTag.bulkCreate(
      (await Tag.bulkGetId(tags)).map(tagId => ({
        challengeId,
        tagId,
      })),
    );

  static removeTagsFromChallenge = async (
    challengeId: number,
    tags: string[],
  ) => {
    if (tags.length === 0) return null;

    return ChallengeTag.destroy({
      where: {
        challengeId,
        tagId: {
          [Op.or]: await Tag.bulkGetId(tags),
        },
      },
    });
  };

  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;
}

export default ChallengeTag;
