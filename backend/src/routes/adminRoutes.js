import express from 'express';
import {
    loginAdmin,
    getMe,
    getDashboardStats,
    registerAdmin,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authAdmin.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Helper route to create first admin
router.get('/me', protect, getMe);
router.get('/stats', protect, getDashboardStats);

export default router;
