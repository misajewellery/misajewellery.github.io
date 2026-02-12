import express from 'express';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus
} from '../controllers/productController.js';
import { protect } from '../middleware/authAdmin.js';

const router = express.Router();

router.route('/')
    .get(protect, getProducts)
    .post(protect, createProduct);

router.route('/:id')
    .put(protect, updateProduct)
    .delete(protect, deleteProduct);

router.patch('/:id/status', protect, toggleProductStatus);

export default router;
