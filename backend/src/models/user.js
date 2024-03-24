import { getDb } from '../util/database.js';
import mongodb from 'mongodb';

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }
  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
  }
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    try {
      const db = getDb();
      return db
        .collection('users')
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
    } catch (err) {
      console.log(err);
    }
  }
  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        // Map retrieved products to include quantity from the cart
        const cartItemsWithQuantity = products.map((p) => {
          const quantity = this.cart.items.find((i) => {
            return i.productId.toString() === p._id.toString();
          }).quantity;
          return {
            ...p,
            quantity: quantity,
          };
        });

        // Calculate total price
        let totalPrice = 0;
        cartItemsWithQuantity.forEach((item) => {
          const price = parseFloat(item.price);
          const quantity = item.quantity;
          totalPrice += price * quantity;
        });

        // Return cart items along with total price
        return {
          cartItems: cartItemsWithQuantity,
          totalPrice: totalPrice.toFixed(2),
        };
      });
  }
}

export { User };
