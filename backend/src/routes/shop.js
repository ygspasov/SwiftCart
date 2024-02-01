import express from 'express';
const router = express.Router();
import {
  getProductsController,
  getProductIdController,
  postProductController,
  getCartController,
  postCartController,
  deleteCartItem,
} from '../controllers/products.js';

router.get('/api/products', getProductsController);

router.get('/api/products/:productId', getProductIdController);
router.post('/api/products/:productId', postProductController);

router.get('/api/users/:userId/cart', getCartController);
router.post('/api/users/:userId/cart', postCartController);

router.delete('/api/users/:userId/cart/:productId', deleteCartItem);

router.get('/', (req, res) => {
  res.send('Home page');
});

export { router };
