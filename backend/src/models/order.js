import mongoose, { SchemaTypes } from 'mongoose';
const { Schema } = mongoose;
const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  totalPrice: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);
export { Order };
