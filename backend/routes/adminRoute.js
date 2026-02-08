import express from 'express';
import { registerAdmin, loginAdmin, logoutAdmin, checkAdminAuth } from '../controllers/adminController.js';
import { validateRegistration } from '../middlewares/validator.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validateRegistration, registerAdmin);
router.post('/login', loginAdmin);
router.get('/logout', logoutAdmin);
router.get('/check-auth', protectAdmin, checkAdminAuth);

export default router;