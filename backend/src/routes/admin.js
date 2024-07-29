import express from 'express';
const router = express.Router();
import {
  getProductsController,
  postProductController,
  editProductController,
  deleteProductController,
  postCategoryController,
} from '../controllers/admin.js';
router.post('/api/products', postProductController);
router.patch('/api/admin/products/edit-product/:productId', editProductController);
router.delete('/api/admin/products/delete-product/:productId', deleteProductController);
router.get('/api/admin/admin-products', getProductsController);
router.post('/api/post-category', postCategoryController);

export { router as adminRouter };
