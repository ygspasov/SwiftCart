import express from 'express';
import { getLoginController } from '../controllers/auth.js';
const router = express.Router();

router.get('/auth/login', getLoginController);

export { router as authRouter };
