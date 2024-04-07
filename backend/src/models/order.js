import mongoose, { SchemaTypes } from 'mongoose';
const { Schema } = mongoose;
const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
  },
});

const Order = mongoose.model('Order', orderSchema);
export { Order };
