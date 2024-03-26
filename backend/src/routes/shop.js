import express from 'express';
const router = express.Router();
import {
  getProductsController,
  getProductIdController,
  getCartController,
  postCartController,
  deleteCartItemController,
  postOrderController,
} from '../controllers/shop.js';

router.get('/api/products', getProductsController);

router.get('/api/products/:productId', getProductIdController);

router.get('/api/cart', getCartController);
router.post('/api/cart/:productId', postCartController);

router.delete('/api/cart/:productId', deleteCartItemController);

router.post('/api/create-order', postOrderController);

router.get('/api/checkout', (req, res) => {
  res.send('Checkout');
});

router.get('/', (req, res) => {
  res.send('Home page');
});

export { router };
