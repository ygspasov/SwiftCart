import { Product } from '../models/product.js';
import mongoose from 'mongoose';
import { deleteFile } from '../utils/file.js';

const getProductsController = async (req, res) => {
  const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id);
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 3; // Default to 3 products per page if not provided

  try {
    // Fetching the total number of products
    const totalProducts = await Product.countDocuments({ userId: userId });
    // Fetching products for the current page (only those created by the currently logged in user)
    const products = await Product.find({ userId: userId })
      .populate('userId')
      .skip((page - 1) * limit)
      .limit(limit);
    // Calculating total number of pages
    const totalPages = Math.ceil(totalProducts / limit);
    // Responding with products and total pages
    res.status(200).json({
      products,
      totalPages,
    });
  } catch (err) {
    console.log('Error fetching products:', err);
    res.status(400).json({ error: 'Cannot get products' });
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
    .then(async (product) => {
      //preventing the edit when the user isn't the one who created the product
      if (!product.userId.equals(req.user._id)) {
        return;
      }
      product.name = name;
      //changing the image path only when a new image is uploaded
      if (image) {
        deleteFile(product.imageUrl);
        product.imageUrl = '/images/' + image.filename;
      }
      product.description = description;
      product.price = price;
      await product.save();
      return res.status(200).json({ message: 'Product edited' });
    })
    .catch((err) => console.log(err));
};

const deleteProductController = (req, res) => {
  const { productId } = req.params;
  console.log('productId', productId);

  Product.findById(productId)
    .then(async (product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      deleteFile(product.imageUrl); // Deleting the file from the file system
      await Product.deleteOne({ _id: productId, userId: req.user._id });

      console.log('Product deleted');
      res.status(200).json({ productId: productId, message: 'Product deleted' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    });
};

export {
  getProductsController,
  postProductController,
  editProductController,
  deleteProductController,
};
