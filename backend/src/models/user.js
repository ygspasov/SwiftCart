import { getDb } from '../util/database.js';
import mongodb from 'mongodb';

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }
  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
  }
  addToCart(product) {
    try {
      const updatedCart = {
        items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }],
      };
      const db = getDb();
      return db
        .collection('users')
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
    } catch (err) {
      console.log(err);
    }
  }
}

export { User };
