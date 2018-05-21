import mongoose from 'mongoose';

export default class Database {
  constructor() {
    mongoose.Promise = global.Promise;
    this.mongoURI = process.env.MONGO_URI;
  }

  connect() {
    return mongoose
      .connect(this.mongoURI)
      .then(() => {
        console.log('Succesfully connected to mongodb');
      })
      .catch(err => {
        console.error(err);
      });
  }

  disconnect() {
    return mongoose.disconnect();
  }
}
