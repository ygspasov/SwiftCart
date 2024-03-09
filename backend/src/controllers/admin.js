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
  const { id, name, imageUrl, description, price } = req.body;
  const product = new Product(id, name, imageUrl, description, price);
  if (product) {
    product.save();
    res.status(200).send(product);
  } else {
    res.status(404).json('Could not find the product.');
  }
};

const editProductController = (req, res) => {
  const { id, name, imageUrl, description, price } = req.body;
  const updatedProduct = new Product(id, name, imageUrl, description, price);
  updatedProduct.save();
  res.status(200).send(id);
  // res.redirect('/admin/admin-products');
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
