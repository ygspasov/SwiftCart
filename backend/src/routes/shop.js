import express from 'express';
const router = express.Router();
import { getProductsController, getProductIdController } from '../controllers/products.js';
import { products, cartItems } from '../assets/fake-data.js';

router.get('/api/products', getProductsController);

router.get('/api/users/:userId/cart', (req, res) => {
  res.status(200).json(cartItems);
});
router.get('/api/products/:productId', getProductIdController);

router.post('/api/users/:userId/cart', (req, res) => {
  const { productId } = req.body;
  const product = products.find((product) => product.id === productId);
  if (product) {
    cartItems.push(product);
    res.status(200).json(cartItems);
  } else {
    res.status(404).json('Could not find the product.');
  }
});

router.delete('/api/users/:userId/cart/:productId', (req, res) => {
  const { productId } = req.params;
  console.log('productId', productId);
  const newCartItems = cartItems.filter((product) => product.id !== productId);
  res.status(200).json(newCartItems);
});

router.get('/', (req, res) => {
  res.send('Home page');
});

export { router };
