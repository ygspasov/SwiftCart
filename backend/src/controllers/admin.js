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
  const id = req.body.id;
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const averageRating = req.body.averageRating;
  const product = new Product(id, name, imageUrl, description, price, averageRating);
  if (product) {
    product.save();
    res.status(200).json(products);
  } else {
    res.status(404).json('Could not find the product.');
  }
};

export { getProductsController, postProductController };
