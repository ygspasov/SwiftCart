import { Product } from '../models/product.js';
import { Order } from '../models/order.js';

const getProductsController = async (req, res) => {
  try {
    Product.find()
      .populate('userId')
      .then((products) => {
        // console.log('products', products);
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

const postOrderController = async (req, res) => {
  try {
    await req.user
      .populate('cart.items.productId')
      .then((user) => {
        const products = user.cart.items.map((item) => {
          return {
            quantity: item.quantity,
            price: item.price,
            product: { ...item.productId._doc },
          };
        });
        const order = new Order({
          user: {
            email: req.user.email,
            userId: req.user,
          },
          products: products,
          totalPrice: user.cart.totalPrice,
        });
        console.log('order', order);
        order.save();
        res.status(200).json({ order: order, message: 'Order created' });
      })
      .then(() => {
        return req.user.clearCart();
      });
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
