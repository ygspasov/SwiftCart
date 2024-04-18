import express from 'express';
import {
  postSignupController,
  getLoginController,
  postLoginController,
  postLogoutController,
} from '../controllers/auth.js';
const router = express.Router();

router.post('/auth/signup', postSignupController);
router.get('/auth/login', getLoginController);
router.post('/auth/login', postLoginController);
router.post('/auth/logout', postLogoutController);

export { router as authRouter };
