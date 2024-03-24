// import { mongoConnect, getDb } from '../util/database.js';
import { Product } from '../models/product.js';

const getProductsController = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    console.log('products', products);
    res.status(200).json(products);
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
    const cartItems = await req.user.getCart();
    if (cartItems) {
      res.status(200).json(cartItems);
    }
  } catch (err) {
    res.status(400).json({ error: 'Cannot get cart items' });
  }
};

const postCartController = (req, res) => {
  const { prodId } = req.body;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log('result', result);
      res.status(200).json(result);
    });
};

const deleteCartItemController = (req, res) => {
  const { productId } = req.params;
  console.log('productId', productId);
  Product.findById(productId, (product) => {
    if (product) {
      Cart.deleteProduct(productId, product.price);
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Could not find the product.' });
    }
  });
};

export {
  getProductsController,
  getProductIdController,
  getCartController,
  postCartController,
  deleteCartItemController,
};
