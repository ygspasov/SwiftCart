import { Category } from '../models/category.js';
import mongoose from 'mongoose';

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error });
  }
};

const postCategoryController = async (req, res) => {
  const { name, description, userId } = req.body;
  const userObjectId = new mongoose.Types.ObjectId(userId);
  try {
    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        message: 'Category already exists',
      });
    }
    //Create a new category
    const category = new Category({
      name,
      description,
      userId: userObjectId,
    });
    const savedCategory = await category.save();
    res.status(201).json({
      message: 'Category created successfully',
      category: savedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'An error occurred while creating the category',
      error: error.message,
    });
  }
};

export { getCategories, postCategoryController };
