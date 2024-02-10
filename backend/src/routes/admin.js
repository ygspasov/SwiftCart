import express from 'express';
const router = express.Router();
import { getProductsController } from '../controllers/admin.js';

router.get('/api/admin/products', getProductsController);

export { router as adminRouter };
