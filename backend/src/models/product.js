import { getDb } from '../util/database.js';
import mongodb from 'mongodb';

class Product {
  constructor(name, imageUrl, description, price, id) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id;
  }

  save() {
    // getProductsFromFile((products) => {
    //   const existingProductIndex = products.findIndex((prod) => prod.id === this.id);
    //   if (existingProductIndex != -1) {
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(assetsPath, JSON.stringify(updatedProducts), (err) => {
    //       if (err) {
    //         console.log('Error writing to file:', err);
    //       } else {
    //         console.log('Products updated successfully!');
    //       }
    //     });
    //   } else {
    //     products.push(this);
    //     fs.writeFile(assetsPath, JSON.stringify(products), (err) => {
    //       if (err) {
    //         console.log('Error writing to file:', err);
    //       } else {
    //         console.log('Products saved successfully!');
    //       }
    //     });
    //   }
    // });

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
    // getProductsFromFile((products) => {
    //   const product = products.find((p) => p.id === id);
    //   cb(product);
    // });
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
