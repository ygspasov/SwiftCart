import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDb } from '../util/database.js';
const currentModuleUrl = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleUrl);
const currentModuleDir = path.dirname(currentModulePath);
const assetsPath = path.join(currentModuleDir, '../../src/assets', 'products.json');
import { Cart } from './cart.js';

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
  constructor(id, name, imageUrl, description, price) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
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
    db.collection('products')
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
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
