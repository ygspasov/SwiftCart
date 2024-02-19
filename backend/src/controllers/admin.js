import { products } from '../assets/fake-data.js';
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

const postProductController = (req, res) => {
  const { id, name, imageUrl, description, price, averageRating } = req.body;
  const product = new Product(id, name, imageUrl, description, price, averageRating);
  if (product) {
    product.save();
    res.status(200).json(products);
  } else {
    res.status(404).json('Could not find the product.');
  }
};

const editProductController = (req, res) => {
  // const { id, name, imageUrl, description, price, averageRating } = req.body;
  res.send('editProductController');
};

export { getProductsController, postProductController, editProductController };
