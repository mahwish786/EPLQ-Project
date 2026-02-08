import express from 'express';
import { register, login, logout, checkUserAuth } from '../controllers/authController.js';
import { validateRegistration } from '../middlewares/validator.js';
import { protectUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/check-auth', protectUser, checkUserAuth);

export default router;