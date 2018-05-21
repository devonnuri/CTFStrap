// @flow
import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

import { generateToken } from '../../lib/Token';
import { hash, validate } from '../../lib/Hash';

const User: Schema = new Schema({
  username: String,
  email: String,
  password: String,
  createdAt: Date
});

class UserClass {
  static findUser(type: 'email' | 'username', value: string): User {
    return this.findOne({ [type]: value }).exec();
  }

  static register(username: string, email: string, password: string): User {
    return new this({
      username,
      email,
      password: hash(password),
      createdAt: new Date()
    }).save();
  }

  static isExists(email: string, username: string): any {
    return this.findOne({
      $or: [{ email }, { username }]
    }).exec();
  }

  validatePassword(password: string): boolean {
    return validate(password, this.password);
  }

  generateToken(): string {
    const { _id, username } = this;

    return generateToken(
      {
        user: {
          _id,
          username
        }
      },
      'user'
    );
  }
}

User.loadClass(UserClass);
export default mongoose.model('User', User);
