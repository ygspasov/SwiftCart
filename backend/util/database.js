import { config } from 'dotenv';
config();
import { MongoClient } from 'mongodb';
console.log('process.env MONGO_USER', process.env.MONGO_USER);
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0qq5jxd.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGODB_URI)
    .then((client) => {
      console.log('Connected');
      callback(client);
    })
    .catch((err) => {
      console.log('err', err);
    });
};

export default mongoConnect;
