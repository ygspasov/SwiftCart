import { config } from 'dotenv';
config();
import { MongoClient } from 'mongodb';
console.log('process.env MONGO_USER', process.env.MONGO_USER);

let _db;

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0qq5jxd.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGODB_URI)
    .then((client) => {
      console.log('Connected');
      _db = client.db();
      if (callback && typeof callback === 'function') {
        callback();
      }
    })
    .catch((err) => {
      console.log('err', err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

export { mongoConnect, getDb };
