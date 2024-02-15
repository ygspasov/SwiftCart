import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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
  constructor(id, name, imageUrl, description, price, averageRating) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.averageRating = averageRating;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(assetsPath, JSON.stringify(products), (err) => {
        if (err) {
          console.log('Error writing to file:', err);
        } else {
          console.log('Products saved successfully!');
        }
      });
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
}

export { Product };
