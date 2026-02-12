import React, { useState, useEffect } from 'react';
import { FaTimes, FaCamera, FaLock } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../styles/ProductModal.css';

const ProductModal = ({ isOpen, onClose, onSave, onDelete, categories, productToEdit, defaultCategoryId }) => {
    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        materialType: 'Gold',
        description: '',
        productNumber: '',
        price: '', // Optional in UI but good for backend
        isActive: true
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                categoryId: productToEdit.categoryId?._id || productToEdit.categoryId, // Handle populated or id
                materialType: productToEdit.materialType,
                description: productToEdit.description,
                productNumber: productToEdit.productNumber ?? '',
                price: productToEdit.price || '',
                isActive: productToEdit.isActive
            });
            setPreviewUrl(productToEdit.imageUrl ? `http://localhost:5001${productToEdit.imageUrl}` : null);
        } else {
            const preferredCategoryId = defaultCategoryId && defaultCategoryId !== ''
                ? defaultCategoryId
                : (categories.length > 0 ? categories[0]._id : '');

            // Reset logic
            setFormData({
                name: '',
                categoryId: preferredCategoryId,
                materialType: 'Gold',
                description: '',
                productNumber: '',
                price: '',
                isActive: true
            });
            setPreviewUrl(null);
            setImageFile(null);
        }
    }, [productToEdit, categories, defaultCategoryId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = productToEdit?.imageUrl;

            // 1. Upload Image if new file selected
            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('image', imageFile);
                const { data } = await api.post('/admin/upload', uploadData);
                imageUrl = data; // Returns path like /uploads/filename.jpg
            }

            if (!imageUrl && !productToEdit) {
                toast.error('Please select an image');
                setLoading(false);
                return;
            }

            const productData = {
                ...formData,
                productNumber: Number(formData.productNumber),
                description: formData.description?.trim() || `Details for ${formData.name}`,
                imageUrl
            };

            await onSave(productData);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = () => {
        if (productToEdit && window.confirm('Are you sure you want to delete this product?')) {
            onDelete(productToEdit._id);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
                    <span className="subtitle">MISA LUXURY JEWELLERY</span>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-section">
                        <label className="section-label">PRODUCT IMAGERY</label>
                        <div className="image-upload-area">
                            <label className="upload-box">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="image-preview" />
                                ) : (
                                    <>
                                        <FaCamera className="upload-icon" />
                                        <span>ADD PHOTO</span>
                                    </>
                                )}
                                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                            </label>
                            <div className="upload-box placeholder"></div>
                            <div className="upload-box placeholder"></div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>PRODUCT NAME</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>CATEGORY</label>
                            <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                                <option value="" disabled>Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group half">
                            <label>MATERIAL TYPE</label>
                            <select name="materialType" value={formData.materialType} onChange={handleChange}>
                                <option value="Gold">Gold</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold With Diamond">Gold With Diamond</option>
                                <option value="Silver With Diamond">Silver With Diamond</option>
                                <option value="18k Gold">18k Gold</option>
                                <option value="Platinum">Platinum</option>
                                <option value="White Gold">White Gold</option>
                                <option value="22k Gold Finish">22k Gold Finish</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>PRODUCT NUMBER</label>
                        <input
                            type="number"
                            name="productNumber"
                            value={formData.productNumber}
                            onChange={handleChange}
                            min="0"
                            step="1"
                            required
                        />
                    </div>

                    {/* Description removed from UI; set automatically on save if empty. */}

                    <button type="submit" className="save-btn" disabled={loading}>
                        <FaLock style={{ marginRight: '8px', fontSize: '0.8rem' }} />
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>

                    {productToEdit && (
                        <button type="button" className="delete-link-btn" onClick={handleDeleteClick} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', textDecoration: 'underline', display: 'block', width: '100%', textAlign: 'center' }}>
                            Delete this product
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
