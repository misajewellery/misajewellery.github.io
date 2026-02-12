import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Authenticate admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    const identifier = email ? email.toLowerCase() : username;

    if (!identifier || !password) {
        res.status(400);
        throw new Error('Please provide email/username and password');
    }

    const admin = email
        ? await Admin.findOne({ email: identifier })
        : await Admin.findOne({ username: identifier });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin.id,
            email: admin.email,
            username: admin.username,
            token: generateToken(admin.id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get current admin data
// @route   GET /api/admin/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.admin);
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalCategories = await Category.countDocuments();
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const inactiveProducts = await Product.countDocuments({ isActive: false });

    res.status(200).json({
        totalCategories,
        totalProducts,
        activeProducts,
        inactiveProducts
    });
});

// @desc    Register a new admin (for seeding purposes)
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });

    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    const admin = await Admin.create({
        email,
        username,
        password,
    });

    if (admin) {
        res.status(201).json({
            _id: admin.id,
            email: admin.email,
            username: admin.username,
            token: generateToken(admin.id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid admin data');
    }
});

export {
    loginAdmin,
    getMe,
    getDashboardStats,
    registerAdmin,
};
