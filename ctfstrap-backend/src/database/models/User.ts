import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsEmail,
  CreatedAt,
  AllowNull,
} from 'sequelize-typescript';
import { Op } from 'sequelize';
import { hash } from '../../lib/crypto';

@Table
class User extends Model<User> {
  static find = (type: 'email' | 'username', value: string) =>
    User.findOne({ where: { [type]: value } })

  static findById = (id: number) => User.findOne({ where: { id } });

  static findAny = (username: string, email: string) =>
    User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    })

  static register = (username: string, email: string, password: string) =>
    User.create({
      username,
      email,
      password: hash(password),
    })

  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Column
  username: string;

  @IsEmail
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @CreatedAt
  createdAt: Date;
}

export default User;
