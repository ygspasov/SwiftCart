import express from 'express';
import { getLoginController, postLoginController } from '../controllers/auth.js';
const router = express.Router();

router.get('/auth/login', getLoginController);
router.post('/auth/login', postLoginController);

export { router as authRouter };
