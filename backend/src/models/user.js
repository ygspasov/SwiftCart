import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: false },
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  let updatedCartItems = [...this.cart.items];
  let updatedCart = {
    items: updatedCartItems,
    totalPrice: 0,
  };
  if (cartProductIndex >= 0) {
    //When the product already exists in the cart
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
    updatedCartItems[cartProductIndex].price += product.price;
  } else {
    //When the product doesn't exist in the cart
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
      price: product.price,
    });
  }
  updatedCartItems.forEach((element) => {
    updatedCart.totalPrice += element.price;
  });
  this.cart = updatedCart;
  try {
    return this.save();
  } catch (err) {
    console.log(err);
  }
};
userSchema.methods.deleteItemFromCart = function (prodId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item._id.toString() !== prodId.toString();
  });
  this.cart.items = updatedCartItems;
  //Updating the total price of the user cart when removing items from it
  let updatedTotalPrice = 0;
  updatedCartItems.forEach((element) => {
    updatedTotalPrice += element.price;
  });
  this.cart.totalPrice = updatedTotalPrice;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [], totalPrice: 0 };
  return this.save();
};

const User = mongoose.model('User', userSchema);
export { User };
