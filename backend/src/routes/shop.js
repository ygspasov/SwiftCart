import express from 'express';
const router = express.Router();
import {
  getProductsController,
  getProductIdController,
  getCartController,
  postCartController,
  deleteCartItemController,
  getInvoiceController,
} from '../controllers/shop.js';

import {
  postOrderController,
  getOrdersController,
  deleteOrderController,
} from '../controllers/orders.js';

router.get('/api/products', getProductsController);

router.get('/api/products/:productId', getProductIdController);

router.get('/api/cart', getCartController);
router.post('/api/cart/:productId', postCartController);

router.delete('/api/cart/:productId', deleteCartItemController);

router.get('/api/orders', getOrdersController);
router.post('/api/create-order', postOrderController);
router.delete('/api/delete-order/:orderId', deleteOrderController);

router.get('/api/checkout', (req, res) => {
  res.send('Checkout');
});

router.get('/', (req, res) => {
  res.send('Home page');
});

router.get('/api/orders/:orderId', getInvoiceController);

export { router as shopRouter };
