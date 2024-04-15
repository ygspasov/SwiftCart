import express from 'express';
import {
  getLoginController,
  postLoginController,
  postLogoutController,
} from '../controllers/auth.js';
const router = express.Router();

router.get('/auth/login', getLoginController);
router.post('/auth/login', postLoginController);
router.post('/auth/logout', postLogoutController);

export { router as authRouter };
