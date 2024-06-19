import { Order } from '../models/order.js';
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

const deleteOrderController = async (req, res) => {
  const orderId = req.params.orderId;
  console.log('Deleting order with id:', orderId);

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

export { postOrderController, getOrdersController, deleteOrderController };
