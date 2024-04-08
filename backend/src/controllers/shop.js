import { Product } from '../models/product.js';
import { Order } from '../models/order.js';

const getProductsController = async (req, res) => {
  try {
    Product.find()
      .populate('userId')
      .then((products) => {
        console.log('products', products);
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
    const cartItems = await req.user.populate('cart.items.productId');
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
  try {
    req.user.deleteItemFromCart(productId);
    res.status(200).json(productId);
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete the product.' });
  }
};

const postOrderController = async (req, res) => {
  try {
    await req.user
      .populate('cart.items.productId')
      .then((user) => {
        const products = user.cart.items.map((item) => {
          return {
            quantity: item.quantity,
            product: { ...item.productId._doc },
          };
        });
        console.log('products', products);
        const order = new Order({
          user: {
            name: req.user.name,
            userId: req.user,
          },
          products: products,
        });
        order.save();
      })
      .then(() => {
        return req.user.clearCart();
      });
    res.status(200).json('Order created.');
  } catch (err) {
    res.status(400).json({ error: 'Failed to create an order.' });
  }
};

const getOrdersController = async (req, res) => {
  try {
    Order.find({ 'user.userId': req.user._id }).then((orders) => {
      console.log('orders', orders);
      res.status(200).json(orders);
    });
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch the orders.' });
  }
};

export {
  getProductsController,
  getProductIdController,
  getCartController,
  postCartController,
  deleteCartItemController,
  postOrderController,
  getOrdersController,
};
