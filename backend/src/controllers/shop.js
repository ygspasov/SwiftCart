// import { mongoConnect, getDb } from '../util/database.js';
import { products, cartItems } from '../assets/fake-data.js';
import { Product } from '../models/product.js';
import { Cart } from '../models/cart.js';

const getProductsController = async (req, res) => {
  try {
    Product.fetchAll((products) => {
      res.status(200).json(products);
    });
  } catch (err) {
    res.status(400).json({ error: 'Cannot get products' });
  }

  // try {
  //   await mongoConnect();
  //   const db = getDb();
  //   const productsCollection = db.collection('products');
  //   const productsFromDB = await productsCollection.find().toArray();
  //   res.status(200).json(productsFromDB);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
};

const getProductIdController = (req, res) => {
  const { productId } = req.params;
  const product = products.find((product) => product.id === productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json('Could not find the product!');
  }
};

const getCartController = (req, res) => {
  res.status(200).json(cartItems);
};

const postCartController = (req, res) => {
  const { prodId } = req.body;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  const product = products.find((product) => product.id === prodId);
  if (product) {
    cartItems.push(product);
    res.status(200).json(products);
  } else {
    res.status(404).json('Could not find the product.');
  }
};

const deleteCartItemController = (req, res) => {
  const { productId } = req.params;
  console.log('productId', productId);
  const newCartItems = cartItems.filter((product) => product.id !== productId);
  res.status(200).json(newCartItems);
};

export {
  getProductsController,
  getProductIdController,
  getCartController,
  postCartController,
  deleteCartItemController,
};
