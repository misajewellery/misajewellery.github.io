import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    sku: {
        type: String,
        unique: true  // Will be auto-generated in controller
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please select a category']
    },
    materialType: {
        type: String,
        required: [true, 'Please select a material type'],
        enum: ['Gold', 'Silver', 'Gold With Diamond', 'Silver With Diamond', 'Platinum', 'White Gold', '18k Gold', '22k Gold Finish']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    productNumber: {
        type: Number,
        required: [true, 'Please add a product number']
    },
    price: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        required: [true, 'Please upload a product image']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
