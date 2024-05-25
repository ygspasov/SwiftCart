import express from 'express';
const router = express.Router();
import {
  getProductsController,
  postProductController,
  editProductController,
  deleteProductController,
} from '../controllers/admin.js';
router.post('/api/products', postProductController);
router.patch('/api/admin/products/edit-product/:productId', editProductController);
router.delete('/api/admin/products/delete-product/:productId', deleteProductController);
router.get('/api/admin/admin-products', getProductsController);

export { router as adminRouter };
