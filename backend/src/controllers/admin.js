// import { products, cartItems } from '../assets/fake-data.js';
import { Product } from '../models/product.js';
const getProductsController = async (req, res) => {
  try {
    Product.fetchAll((products) => {
      res.status(200).json(products);
    });
  } catch (err) {
    res.status(400).json({ error: 'Cannot get products' });
  }
};

export { getProductsController };
