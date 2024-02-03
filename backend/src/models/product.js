import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const currentModuleUrl = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleUrl);
const currentModuleDir = path.dirname(currentModulePath);
const assetsPath = path.join(currentModuleDir, '../../src/assets', 'products.json');
// import { products } from '../assets/fake-data.js';
let products = [];

class Product {
  constructor(name) {
    this.name = name;
  }

  save() {
    fs.readFile(assetsPath, (err, fileContent) => {
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(assetsPath, JSON.stringify(products), (err) => {
        if (err) {
          console.log('Error writing to file:', err);
        } else {
          console.log('Products saved successfully!');
        }
      });
      console.log('products', products);
    });
  }
  static fetchAll(cb) {
    fs.readFile(assetsPath, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      console.log('fileContent', JSON.parse(fileContent));
      cb(JSON.parse(fileContent));
    });
  }
}

export { Product };
