import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/admin/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.json(categories);
});

// @desc    Get all categories (public)
// @route   GET /api/categories
// @access  Public
const getPublicCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.json(categories);
});

const buildCategoryCode = (name) => {
    const cleaned = (name || '').trim();
    if (!cleaned) return 'CAT';

    const words = cleaned.split(/\s+/).filter(Boolean);
    let code = '';

    if (words.length > 1) {
        code = words.map(word => word[0]).join('');
    } else {
        code = cleaned.replace(/[^a-zA-Z]/g, '').slice(0, 3);
    }

    return (code || 'CAT').toUpperCase().slice(0, 3);
};

// @desc    Create a category
// @route   POST /api/admin/categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
    const { name, code, imageUrl } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Please add a name');
    }

    // Generate slug
    const slug = name.toLowerCase().split(' ').join('-');

    const categoryExists = await Category.findOne({ slug });

    if (categoryExists) {
        res.status(400);
        throw new Error('Category already exists');
    }

    const category = await Category.create({
        name,
        slug,
        code: code || buildCategoryCode(name),
        imageUrl
    });

    res.status(201).json(category);
});

// @desc    Update a category
// @route   PUT /api/admin/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Update slug if name changes
    if (req.body.name) {
        req.body.slug = req.body.name.toLowerCase().split(' ').join('-');
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedCategory);
});

// @desc    Delete a category
// @route   DELETE /api/admin/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    await category.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Category removed' });
});

export {
    getCategories,
    getPublicCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
