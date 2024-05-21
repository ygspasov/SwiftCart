import { Product } from '../models/product.js';
import mongoose from 'mongoose';

const getProductsController = async (req, res) => {
  const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id);
  try {
    //Filtering the products in the admin section to only those the currently logged in user created
    Product.find({ userId: userId })
      .populate('userId')
      .then((products) => {
        console.log('products', products);
        res.status(200).json(products);
      });
  } catch (err) {
    res.status(400).json({ error: 'Cannot get products!' });
  }
};

const postProductController = (req, res) => {
  const { name, imageUrl, description, price } = req.body;
  console.log('req.user', req.user);
  const product = new Product({
    name: name,
    imageUrl: imageUrl,
    description: description,
    price: price,
    userId: req.user,
  });
  if (product) {
    product.save();
    res.status(200).json({ product: product, message: 'Product added' });
  } else {
    res.status(404).json('Could not find the product.');
  }
};

const editProductController = (req, res) => {
  const { name, imageUrl, description, price, id } = req.body;
  Product.findById(id)
    .then((product) => {
      product.name = name;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;
      return product.save();
    })
    .then(() => res.status(200).json({ message: 'Product edited' }))
    .catch((err) => console.log(err));
};

const deleteProductController = (req, res) => {
  const { productId } = req.params;
  console.log('productId', productId);
  Product.findByIdAndDelete(productId).then(() => {
    console.log('Product deleted');
    res.status(200).json({ productId: productId, message: 'Product deleted' });
  });
};

export {
  getProductsController,
  postProductController,
  editProductController,
  deleteProductController,
};
