import fs from 'fs';
import path from 'path';
import { Product } from '../models/product.js';
import { Order } from '../models/order.js';

// import { join } from 'path';
const getProductsController = async (req, res) => {
  try {
    Product.find()
      .populate('userId')
      .then((products) => {
        // console.log('products', products);
        res.status(200).json(products);
      });
  } catch (err) {
    console.log('Error fetching products:', err);
    res.status(400).json({ error: 'Cannot get products' });
  }
};

const getProductIdController = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(404).json('Could not find the product!');
  }
};

const getCartController = async (req, res) => {
  try {
    await req.user.populate('cart.items.productId').then((cartItems) => {
      res.status(200).json(cartItems);
    });
  } catch (err) {
    res.status(400).json({ error: 'Cannot get cart items' });
  }
};

const postCartController = async (req, res) => {
  const { prodId } = req.body;
  await Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.status(200).json({ result: result, message: 'Added to cart' });
    });
};

const deleteCartItemController = (req, res) => {
  const { productId } = req.params;
  try {
    req.user.deleteItemFromCart(productId);
    res.status(200).json({ productId: productId, message: 'Removed from cart' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete the product.' });
  }
};

const getInvoiceController = (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    Order.findById(orderId)
      .then((order) => {
        if (!order) {
          return next(new Error('No order found.'));
        }
        //checking if the order belongs to the currently logged in user in order to allow file download
        if (order.user.userId.toString() !== req.user._id.toString()) {
          return next(new Error('Unauthorized'));
        }
        const invoiceName = 'invoice-' + orderId + '.pdf';
        const invoicePath = path.join('backend', 'src', 'assets', 'invoices', invoiceName);
        fs.access(invoicePath, fs.constants.F_OK, (err) => {
          if (err) {
            if (err.code === 'ENOENT') {
              return res.status(404).send('Invoice not found');
            }
            return next(err);
          }
          // Setting content type header
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceName + '"');
          // Trigger file download in the browser
          res.download(invoicePath, invoiceName, (err) => {
            if (err) {
              return next(err);
            }
          });
        });
      })
      .catch((err) => next(err));
  } catch (error) {
    return next(error);
  }
};

export {
  getProductsController,
  getProductIdController,
  getCartController,
  postCartController,
  deleteCartItemController,
  getInvoiceController,
};
