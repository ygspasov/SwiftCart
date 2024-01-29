import express from 'express';
import bodyParser from 'body-parser';

import mongoConnect from '../util/database.js';
// console.log('process.env', process.env);
const app = express();

app.use(bodyParser.json());

// import bookImage1 from './books/Dune.jpg';
// import bookImage2 from './books/Dune_The_Battle_of_Corrin.jpg';
// import bookImage3 from './books/Dune_The_Machine_Crusade.jpg';
// import bookImage4 from './books/Mentats_of_Dune.jpg';

const products = [
  {
    id: '123',
    name: 'Dune',
    price: '6.00',
    description: 'Dune is a 1965 epic science fiction novel book by American author Frank Herbert',
    imageUrl: './books/Dune.jpg',
    averageRating: '5.0',
  },
  {
    id: '234',
    name: 'Mentats of Dune',
    price: '12.00',
    description:
      'Mentats of Dune is a 2014 science fiction novel by Brian Herbert and Kevin J. Anderson, set in the Dune universe created by Frank Herbert.',
    imageUrl: './books/Dune_The_Battle_of_Corrin.jpg',
    averageRating: '5.0',
  },
  {
    id: '345',
    name: 'The Battle of Corrin',
    price: '9.00',
    description:
      'The Battle of Corrin is a 2004 science fiction novel by Brian Herbert and Kevin J. Anderson, set in the fictional Dune universe created by Frank Herbert',
    imageUrl: './books/Dune_The_Machine_Crusade.jpg',
    averageRating: '5.0',
  },
  {
    id: '456',
    name: 'Dune: The Machine Crusade',
    price: '19.00',
    description:
      'Dune: The Machine Crusade is a 2003 science fiction novel by Brian Herbert and Kevin J. Anderson, set in the fictional Dune universe created by Frank Herbert.',
    imageUrl: './books/Mentats_of_Dune.jpg',
    averageRating: '5.0',
  },
];

let cartItems = [products[0], products[2], products[3]];

app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});
app.get('/api/users/:userId/cart', (req, res) => {
  res.status(200).json(cartItems);
});
app.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params;
  const product = products.find((product) => product.id === productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json('Could not find the product!');
  }
});
app.post('/api/users/:userId/cart', (req, res) => {
  const { productId } = req.body;
  const product = products.find((product) => product.id === productId);
  if (product) {
    cartItems.push(product);
    res.status(200).json(cartItems);
  } else {
    res.status(404).json('Could not find the product!');
  }
});
app.delete('/api/users/:userId/cart/:productId', (req, res) => {
  const { productId } = req.params;
  console.log('productId', productId);
  cartItems = cartItems.filter((product) => product.id !== productId);
  res.status(200).json(cartItems);
});
const port = process.env.PORT;
mongoConnect((client) => {
  // console.log(client);
  app.listen(port);
});
