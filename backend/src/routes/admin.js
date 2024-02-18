import express from 'express';
const router = express.Router();
import { getProductsController, postProductController } from '../controllers/admin.js';
router.post('/api/products/:productId', postProductController);
router.get('/api/admin/products', getProductsController);

export { router as adminRouter };
