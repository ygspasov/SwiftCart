import mongoose from 'mongoose';
const { Schema } = mongoose;
const productSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: Object, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

const Product = mongoose.model('Product', productSchema);
export { Product };
