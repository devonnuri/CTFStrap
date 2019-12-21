import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  AllowNull,
} from 'sequelize-typescript';
import { Op } from 'sequelize';
import Challenge from './Challenge';

@Table({ timestamps: false })
class File extends Model<File> {
  static bulkFindById = async (ids: number[]) =>
    File.findAll({
      where: {
        id: {
          [Op.or]: ids,
        },
      },
    });

  static bulkDestroy = async (ids: number[]) => {
    if (!ids) return null;

    return File.destroy({
      where: {
        id: ids,
      },
    });
  };

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  filename: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  originalname: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  path: string;

  @AllowNull(false)
  @Column
  size: number;

  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @BelongsTo(() => Challenge)
  challenge: Challenge;
}

export default File;
