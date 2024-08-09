import mongoose from 'mongoose';
const { Schema } = mongoose;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: String, // For storing a category image URL
});

const Category = mongoose.model('Category', categorySchema);
export { Category };
