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
      const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id: id,
          qty: 1,
        };
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      cart.products = { ...cart.products, updatedProduct };
      fs.writeFile(assetsPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
}

export { Cart };
