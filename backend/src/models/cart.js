import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const currentModuleUrl = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleUrl);
const currentModuleDir = path.dirname(currentModulePath);
const assetsPath = path.join(currentModuleDir, '../../src/assets', 'cart.json');
class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(assetsPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProduct = cart.products.find((prod) => prod.id === id);
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
      } else {
        updatedProduct = {
          id: id,
          qty: 1,
        };
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      cart.products = { ...cart.products, updatedProduct };
    });
  }
}

export { Cart };
