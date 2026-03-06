import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaChevronLeft, FaEdit } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../styles/Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', imageUrl: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const backendBaseUrl = api.defaults.baseURL?.replace(/\/api\/?$/, '') || '';

    const resolveCategoryImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${backendBaseUrl}${imageUrl}`;
    };

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

    const fetchCategories = async () => {
        try {
            const [{ data: categoriesData }, { data: productsData }] = await Promise.all([
                api.get('/admin/categories'),
                api.get('/admin/products')
            ]);
            setCategories(categoriesData);
            setProducts(productsData);
        } catch (error) {
            toast.error('Failed to load categories/products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this category?')) {
            try {
                await api.delete(`/admin/categories/${id}`);
                setCategories(prev => prev.filter(c => c._id !== id));
                toast.success('Category deleted');
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const trimmedName = formData.name.trim();
            if (!trimmedName) {
                toast.error('Please add a category name');
                return;
            }

            const alreadyExists = categories.some(
                (cat) => cat.name.toLowerCase() === trimmedName.toLowerCase()
                    && cat._id !== editingCategory?._id
            );
            if (alreadyExists) {
                toast.error('Category already exists');
                return;
            }

            let uploadedImageUrl = formData.imageUrl;

            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('image', imageFile);
                setIsUploading(true);
                const { data } = await api.post('/admin/upload', uploadData);
                uploadedImageUrl = data;
            }

            if (editingCategory) {
                await api.put(`/admin/categories/${editingCategory._id}`, {
                    name: trimmedName,
                    imageUrl: uploadedImageUrl
                });
                toast.success('Category updated');
            } else {
                await api.post('/admin/categories', {
                    name: trimmedName,
                    code: buildCategoryCode(trimmedName),
                    imageUrl: uploadedImageUrl
                });
                toast.success('Category added');
            }
            setShowModal(false);
            setFormData({ name: '', imageUrl: '' });
            setImageFile(null);
            setImagePreview('');
            setEditingCategory(null);
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add category');
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            setImageFile(null);
            setImagePreview('');
            return;
        }
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ name: '', imageUrl: '' });
        setImageFile(null);
        setImagePreview('');
        setEditingCategory(null);
    };

    const openAddModal = () => {
        setEditingCategory(null);
        setFormData({ name: '', imageUrl: '' });
        setImageFile(null);
        setImagePreview('');
        setShowModal(true);
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        setFormData({ name: category.name || '', imageUrl: category.imageUrl || '' });
        setImageFile(null);
        setImagePreview(resolveCategoryImageUrl(category.imageUrl));
        setShowModal(true);
    };

    const getProductsForCategory = (categoryId) => {
        return products.filter((product) => {
            const productCategoryId = typeof product.categoryId === 'object'
                ? product.categoryId?._id
                : product.categoryId;
            return productCategoryId === categoryId;
        });
    };

    return (
        <div className="categories-container">
            <div className="categories-header">
                <button className="back-btn" onClick={() => navigate('/admin')}><FaChevronLeft /></button>
                <h1>Manage Categories</h1>
                <button className="add-btn-circle" onClick={openAddModal}><FaPlus /></button>
            </div>

            <div className="categories-list">
                {loading ? <p>Loading...</p> : categories.map(cat => {
                    const categoryProducts = getProductsForCategory(cat._id);

                    return (
                        <div key={cat._id} className="category-item">
                            <div className="category-main">
                                {cat.imageUrl ? (
                                    <img
                                        src={resolveCategoryImageUrl(cat.imageUrl)}
                                        alt={cat.name}
                                        className="category-thumb"
                                    />
                                ) : (
                                    <div className="category-thumb category-thumb-placeholder">No Image</div>
                                )}

                                <div className="category-info">
                                    <h3>{cat.name}</h3>
                                    <p>Slug: {cat.slug}</p>
                                    <p>Products: {categoryProducts.length}</p>

                                    <div className="category-product-list">
                                        {categoryProducts.length > 0 ? (
                                            categoryProducts.slice(0, 3).map((product) => (
                                                <span key={product._id} className="category-product-chip">
                                                    {product.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="category-product-empty">No products</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="category-actions">
                                <button className="edit-btn" onClick={() => openEditModal(cat)}>
                                    <FaEdit />
                                </button>
                                <button className="delete-btn" onClick={() => handleDelete(cat._id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '350px' }}>
                        <div className="modal-header">
                            <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group image-group">
                                <label className="image-label">Category Image</label>
                                <div className="image-upload">
                                    <input
                                        id="category-image"
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleImageChange}
                                        required={!editingCategory}
                                        className="image-input"
                                    />
                                    <label htmlFor="category-image" className="image-circle">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Category preview" />
                                        ) : (
                                            <span>Add Image</span>
                                        )}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="save-btn" disabled={isUploading}>
                                {isUploading ? 'Uploading...' : (editingCategory ? 'Save Changes' : 'Add Category')}
                            </button>
                            <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ height: '80px' }}></div>
        </div>
    );
};

export default Categories;
