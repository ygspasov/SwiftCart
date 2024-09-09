import express from 'express';
import { getCategories, postCategoryController } from '../controllers/categories.js';
const router = express.Router();
router.get('/api/categories', getCategories);
router.post('/api/post-category', postCategoryController);
export { router as categoriesRouter };
