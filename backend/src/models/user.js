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
  deleteItemFromCart(prodId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== prodId.toString();
    });
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
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
        const cartItems = products.map((p) => {
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
        cartItems.forEach((item) => {
          const price = parseFloat(item.price);
          const quantity = item.quantity;
          totalPrice += price * quantity;
        });

        totalPrice = totalPrice.toFixed(2);
        // Return cart items along with total price
        return { cartItems, totalPrice };
      });
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new mongodb.ObjectId(this._id),
            name: this.username,
          },
        };
        //Adding the user cart as a new order in the orders collection.
        return db.collection('orders').insertOne(order);
      })
      .then(() => {
        //Empyting the user cart both in the User class and the db
        this.cart = { items: [] };
        return db
          .collection('users')
          .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: [] } } });
      });
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders');
  }
}

export { User };
