import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsEmail,
  CreatedAt,
  NotNull,
  AllowNull,
} from 'sequelize-typescript';
import { Op } from 'sequelize';
import { hash } from '../../lib/crypto';

@Table
class User extends Model<User> {
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

export const find = (type: 'email' | 'username', value: string) => {
  return User.findOne({ where: { [type]: value } });
};

export const findById = (id: number) => {
  return User.findOne({ where: { id } });
};

export const findAny = (username: string, email: string) => {
  return User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });
};

export const register = (username: string, email: string, password: string) => {
  return User.create({
    username,
    email,
    password: hash(password),
  });
};

export default User;
