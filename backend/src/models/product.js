import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDb } from '../util/database.js';
import { Cart } from './cart.js';
import mongodb from 'mongodb';
const currentModuleUrl = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleUrl);
const currentModuleDir = path.dirname(currentModulePath);
const assetsPath = path.join(currentModuleDir, '../../src/assets', 'products.json');

const getProductsFromFile = (cb) => {
  fs.readFile(assetsPath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

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
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id !== id);
      const newProducts = products.filter((product) => product.id !== id);
      console.log('newProducts', newProducts);
      fs.writeFile(assetsPath, JSON.stringify(newProducts), (err) => {
        if (err) {
          console.log('Error deleting the file:', err);
        } else {
          Cart.deleteProduct(id, product.price);
          console.log('Product deleted successfully!');
        }
      });
    });
  }
}

export { Product };
