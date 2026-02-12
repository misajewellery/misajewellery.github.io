import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

// Helper to generate SKU: MISA-<CAT>-###
const generateSKU = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) throw new Error('Category not found for SKU generation');

    const catCode = category.code;
    const count = await Product.countDocuments({ categoryId });
    const number = (count + 1).toString().padStart(3, '0');

    return `MISA-${catCode}-${number}`;
};

// @desc    Get products with search and filter
// @route   GET /api/admin/products OR /api/products
// @access  Public/Private
const getProducts = asyncHandler(async (req, res) => {
    const { search, category, materialType, status } = req.query;

    let query = {};

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { sku: { $regex: search, $options: 'i' } }
        ];
    }

    if (category) {
        // Check if category is sent as ID or Slug
        const categoryDoc = await Category.findOne({
            $or: [
                { slug: category },
                { _id: (category.match(/^[0-9a-fA-F]{24}$/) ? category : null) }
            ]
        });

        if (categoryDoc) {
            query.categoryId = categoryDoc._id;
        } else {
            // Category not found, return empty
            return res.json([]);
        }
    }

    if (materialType) {
        query.materialType = materialType;
    }

    if (status) { // 'active' or 'inactive'
        query.isActive = status === 'active';
    }

    const products = await Product.find(query)
        .populate('categoryId', 'name slug code')
        .sort({ createdAt: -1 });

    res.json(products);
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('categoryId', 'name slug');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
    const { name, categoryId, materialType, description, price, imageUrl, productNumber } = req.body;

    if (!name || !categoryId || !materialType || !description || !imageUrl || productNumber === undefined || productNumber === null || productNumber === '') {
        res.status(400);
        throw new Error('Please add all required fields');
    }

    const sku = await generateSKU(categoryId);

    const product = await Product.create({
        name,
        sku,
        categoryId,
        materialType,
        description,
        productNumber,
        price,
        imageUrl,
        isActive: true
    });

    res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    await product.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Product removed' });
});

// @desc    Toggle product status
// @route   PATCH /api/admin/products/:id/status
// @access  Private
const toggleProductStatus = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json(product);
});

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus
};
