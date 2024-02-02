import { products } from '../assets/fake-data.js';

class Product {
  constructor(name) {
    this.name = name;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
}

export { Product };
