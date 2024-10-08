import { Product } from '../models/product.js';
import mongoose from 'mongoose';
import { deleteFile } from '../utils/file.js';

const getProductsController = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
  }
  const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id);
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 3; // Default to 3 products per page if not provided
  const categoryId = req.query.categoryId;
  const search = req.query.search; // The search filter term
  try {
    // Building the query object
    const query = { userId: userId };
    // Adding categoryId to the query object
    if (categoryId) {
      query.categoryId = mongoose.Types.ObjectId.createFromHexString(categoryId);
    }
    // Adding search filter to the query object
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive regex search
    }

    // If a search filter is applied, fetch all matching products without pagination
    if (search) {
      const products = await Product.find(query).populate('userId');
      return res.status(200).json({
        products,
        totalPages: 1, // Single page as all matching products are returned
      });
    }
    // Fetching the total number of products
    const totalProducts = await Product.countDocuments(query);
    // Fetching products for the current page (only those created by the currently logged in user)
    const products = await Product.find(query)
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
  const { name, description, price, categoryId } = req.body;
  const image = req.file;
  if (!image) {
    return res.status(422).json({ message: 'The attached file is not an image.' });
  }
  const imageUrl = '/images/' + image.filename;
  const product = new Product({
    name: name,
    imageUrl: imageUrl,
    description: description,
    price: price,
    userId: req.user,
    categoryId: categoryId,
  });
  if (product) {
    product.save();
    res.status(200).json({ product: product, message: 'Product added' });
  } else {
    res.status(404).json('Could not find the product.');
  }
};

const editProductController = (req, res) => {
  const { name, description, price, id, categoryId } = req.body;
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
      product.categoryId = categoryId;
      await product.save();
      return res.status(200).json({ message: 'Product edited' });
    })
    .catch((err) => console.log(err));
};

const deleteProductController = (req, res) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then(async (product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      deleteFile(product.imageUrl); // Deleting the file from the file system
      await Product.deleteOne({ _id: productId, userId: req.user._id });
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
