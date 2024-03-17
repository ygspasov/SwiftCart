import { Product } from '../models/product.js';
import mongodb from 'mongodb';
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
  const { name, imageUrl, description, price } = req.body;
  const product = new Product(name, imageUrl, description, price);
  if (product) {
    product.save();
    res.status(200).send(product);
  } else {
    res.status(404).json('Could not find the product.');
  }
};

const editProductController = (req, res) => {
  const { name, imageUrl, description, price, id } = req.body;
  const updatedProduct = new Product(name, imageUrl, description, price, new mongodb.ObjectId(id));
  updatedProduct.save();
  res.status(200).send(id);
};

const deleteProductController = (req, res) => {
  const { productId } = req.params;
  Product.deleteById(productId);
  res.status(200).json(productId);
  res.redirect('/admin/admin-products');
};

export {
  getProductsController,
  postProductController,
  editProductController,
  deleteProductController,
};
