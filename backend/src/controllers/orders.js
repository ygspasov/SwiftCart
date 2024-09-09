import { Order } from '../models/order.js';
import { User } from '../models/user.js';
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
          user: { name: req.user.name, email: req.user.email, userId: req.user },
          products: products,
          totalPrice: user.cart.totalPrice,
          createdAt: new Date(), // The order's creation date
        });
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

const updateCartProductQuantityController = async (req, res) => {
  const productId = req.params.productId;
  const newQuantity = req.body.quantity;

  try {
    const user = await User.findById(req.user._id).populate('cart.items.productId');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the item in cart and update quantity
    const cartItem = user.cart.items.find((item) => item.productId._id.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cartItem.quantity = newQuantity;

    // Recalculating totalPrice
    user.cart.totalPrice = user.cart.items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    await user.save();

    res.status(200).json({ message: 'Quantity updated successfully', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update quantity' });
  }
};

const getOrdersController = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
  }
  try {
    Order.find({ 'user.userId': req.user._id }).then((orders) => {
      res.status(200).json(orders);
    });
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch the orders.' });
  }
};

const deleteOrderController = async (req, res) => {
  const orderId = req.params.orderId;

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  try {
    const result = await Order.deleteOne({ _id: orderId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json({ id: orderId, message: 'Order removed.' });
  } catch (err) {
    res.status(400).json({ error: 'An error occurred.', message: 'Failed to remove the order.' });
  }
};

export {
  postOrderController,
  getOrdersController,
  deleteOrderController,
  updateCartProductQuantityController,
};
