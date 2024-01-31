import express from 'express';
const router = express.Router();
import { mongoConnect, getDb } from '../util/database.js';
import { products, cartItems } from '../assets/fake-data.js';

router.get('/api/products', async (req, res) => {
  try {
    await mongoConnect();
    const db = getDb();
    const productsCollection = db.collection('products');
    const productsFromDB = await productsCollection.find().toArray();
    res.status(200).json(productsFromDB);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/users/:userId/cart', (req, res) => {
  res.status(200).json(cartItems);
});
router.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params;
  const product = products.find((product) => product.id === productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json('Could not find the product!');
  }
});

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
