import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    code: { // Added helper for SKU generation (e.g. Rings -> RG)
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        maxLength: 3
    },
    imageUrl: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
