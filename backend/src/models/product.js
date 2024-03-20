import { getDb } from '../util/database.js';
import mongodb from 'mongodb';

class Product {
  constructor(name, imageUrl, description, price, id, userId) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //Updating the product
      dbOp = db
        .collection('products')
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(id) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        console.log('product', product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteById(id) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then(() => {
        console.log('Product deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { Product };
