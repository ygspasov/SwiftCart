import express from 'express';
const router = express.Router();
import {
  getProductsController,
  postProductController,
  editProductController,
} from '../controllers/admin.js';
router.post('/api/products/:productId', postProductController);
router.patch('/api/admin/products/edit-product/:productId', editProductController);
router.get('/api/admin/products', getProductsController);

export { router as adminRouter };
