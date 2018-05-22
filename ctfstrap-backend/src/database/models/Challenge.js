// @flow
import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const Challenge: Schema = new Schema({
  name: String,
  description: String,
  category: String,
  flag: String,
  createdAt: Date
});

class ChallengeClass {
  static register(name: string, description: string, category: string, flag: string) {
    return new this({
      name,
      description,
      category,
      flag,
      createdAt: new Date()
    }).save();
  }

  static isExists(name: string): any {
    return this.findOne({
      $or: [{ name }]
    }).exec();
  }

  authFlag(flag: string): boolean {
    return flag === this.flag;
  }
}

Challenge.loadClass(ChallengeClass);
export default mongoose.model('Challenge', Challenge);
