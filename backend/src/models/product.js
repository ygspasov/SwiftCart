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
  constructor(name) {
    this.name = name;
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
}

export { Product };
