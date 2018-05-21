// @flow
import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

import { generateToken } from '../../lib/Token';
import { hash, validate } from '../../lib/Hash';

const UserSchema: Schema = new Schema({
  username: String,
  email: String,
  password: String,
  createdAt: Date
});

const Model = mongoose.model('User', UserSchema);

Model.findUser = (type: 'email' | 'username', value: string): User => {
  return Model.findOne({ [type]: value }).exec();
};

Model.register = (username: string, email: string, password: string): User => {
  return new Model({
    username,
    email,
    password: hash(password),
    createdAt: new Date()
  }).save();
};

Model.isExists = (email: string, username: string) => {
  return Model.findOne({
    $or: [{ email }, { username }]
  }).exec();
};

Model.prototype.validatePassword = (password: string): string => {
  console.log(Model);
  return validate(password, Model.password);
};

Model.prototype.generateToken = (): string => {
  const { _id, username } = Model;

  return generateToken(
    {
      user: {
        _id,
        username
      }
    },
    'user'
  );
};

export default Model;
