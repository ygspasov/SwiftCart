import fs from 'fs';
import path from 'path';
import { Product } from '../models/product.js';
import mongoose from 'mongoose';
import { Order } from '../models/order.js';
import moment from 'moment';
import PDFDocument from 'pdfkit';

const getProductsController = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 6; // Default to 6 products per page if not provided
  const categoryId = req.query.categoryId;
  try {
    const query = {};
    // Adding categoryId to the query object
    if (categoryId) {
      query.categoryId = mongoose.Types.ObjectId.createFromHexString(categoryId);
    }
    // Fetching the total number of products
    const totalProducts = await Product.countDocuments(query);
    // Fetching products for the current page
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
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
  }
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
        // Checking if the order belongs to the currently logged-in user to allow file download
        if (order.user.userId.toString() !== req.user._id.toString()) {
          return next(new Error('Unauthorized'));
        }
        const invoiceName = 'invoice-' + orderId + '.pdf';
        const invoicePath = path.join('backend', 'src', 'assets', 'invoices', invoiceName);
        const invoiceNumber = order._id;
        const clientName = order.user.name;
        const invoiceDate = order.createdAt;

        const pdfDoc = new PDFDocument();

        // Setting headers for the response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${invoiceName}"`);

        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);

        // Table headers
        const nameX = 50;
        const quantityX = 300;
        const priceX = 400;
        let y = 100;

        pdfDoc.fontSize(24).text('Invoice', nameX, y, { align: 'left' });
        y += 20;
        pdfDoc
          .fontSize(14)
          .text(
            '-------------------------------------------------------------------------------------',
            nameX,
            y,
            {
              align: 'left',
            }
          );
        y += 20;
        pdfDoc.fontSize(12).text('Invoice# ' + invoiceNumber, nameX, y);
        y += 20;
        pdfDoc.fontSize(12).text('from ' + moment(invoiceDate).format('MMM Do YYYY'));
        y = 180;
        pdfDoc.fontSize(12).text('Client: ' + clientName, nameX, y);
        y += 20;
        pdfDoc
          .fontSize(14)
          .text(
            '-------------------------------------------------------------------------------------',
            nameX,
            y,
            {
              align: 'left',
            }
          );
        y += 20;
        pdfDoc.fontSize(12).text('Item', nameX, y, { underline: true });
        pdfDoc.text('Quantity', quantityX, y, { underline: true });
        pdfDoc.text('Price', priceX, y, { underline: true });
        y += 20;
        // Table rows
        order.products.forEach((prod) => {
          pdfDoc.fontSize(10).text(prod.product.name, nameX, y);
          pdfDoc.text(prod.quantity, quantityX, y);
          pdfDoc.text(`$${prod.product.price}`, priceX, y);
          y += 10; // Moving to next line
        });

        y += 10;

        pdfDoc
          .fontSize(14)
          .text(
            '-------------------------------------------------------------------------------------',
            nameX,
            y,
            {
              align: 'left',
            }
          );
        y += 20;
        pdfDoc.fontSize(16).text('Total Price: $' + order.totalPrice, nameX, y, { align: 'left' });

        pdfDoc.end();
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
