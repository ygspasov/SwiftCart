import { Product } from '../models/product.js';
import mongoose from 'mongoose';

const getProductsController = async (req, res) => {
  const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id);
  try {
    //Filtering the products in the admin section to only those the currently logged in user created
    Product.find({ userId: userId })
      .populate('userId')
      .then((products) => {
        // console.log('products', products);
        res.status(200).json(products);
      });
  } catch (err) {
    res.status(400).json({ error: 'Cannot get products!' });
  }
};

const postProductController = (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file;
  if (!image) {
    return res.status(422).json({ message: 'The attached file is not an image.' });
  }
  const imageUrl = '/images/' + image.filename;
  console.log('image', image);
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
  const { name, description, price, id } = req.body;
  const image = req.file;
  Product.findById(id)
    .then((product) => {
      //preventing the edit when the user isn't the one who created the product
      if (!product.userId.equals(req.user._id)) {
        return;
      }
      product.name = name;
      //changing the image path only when a new image is uploaded
      if (image) {
        product.imageUrl = image.path;
      }
      product.description = description;
      product.price = price;
      return product.save().then(() => res.status(200).json({ message: 'Product edited' }));
    })
    .catch((err) => console.log(err));
};

const deleteProductController = (req, res) => {
  const { productId } = req.params;
  console.log('productId', productId);
  Product.deleteOne({ _id: productId, userId: req.user._id }).then(() => {
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
