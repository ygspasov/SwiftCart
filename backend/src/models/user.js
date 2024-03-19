import { getDb } from '../util/database.js';
import mongodb from 'mongodb';

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }
  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
  }
}

export { User };
