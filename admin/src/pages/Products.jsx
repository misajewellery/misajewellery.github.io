import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus, FaChevronLeft, FaTrash, FaPen } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';
import ProductModal from '../components/ProductModal';
import '../styles/Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const navigate = useNavigate();

    // Fetch Logic
    const fetchData = async () => {
        try {
            setLoading(true);
            const [prodRes, catRes] = await Promise.all([
                api.get('/admin/products', {
                    params: { search, category: selectedCategory }
                }),
                api.get('/admin/categories')
            ]);
            setProducts(prodRes.data);
            setCategories(catRes.data);
        } catch (error) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [search, selectedCategory]);

    const handleToggleStatus = async (id) => {
        // Optimistic Update
        setProducts(prev => prev.map(p =>
            p._id === id ? { ...p, isActive: !p.isActive } : p
        ));

        try {
            await api.patch(`/admin/products/${id}/status`);
            toast.success('Status updated');
        } catch (error) {
            toast.error('Failed to update status');
            // Revert
            fetchData();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/admin/products/${id}`);
                setProducts(prev => prev.filter(p => p._id !== id));
                toast.success('Product deleted');
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    const handleSaveProduct = async (productData) => {
        try {
            if (productToEdit) {
                await api.put(`/admin/products/${productToEdit._id}`, productData);
                toast.success('Product updated');
            } else {
                await api.post('/admin/products', productData);
                toast.success('Product created');
            }
            fetchData();
        } catch (error) {
            console.error(error);
            throw error; // Let modal handle error toast
        }
    };

    const openEditModal = (product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    return (
        <div className="products-container">
            {/* Header */}
            <div className="products-header">
                <button className="back-btn" onClick={() => navigate('/admin')}><FaChevronLeft /></button>
                <h1>Manage Products</h1>
                <button className="add-btn-circle" onClick={openAddModal}><FaPlus /></button>
            </div>

            {/* Search */}
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search SKU or Material"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Categories Filter */}
            <div className="category-filters">
                <button
                    className={`filter-chip ${selectedCategory === '' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('')}
                >
                    All
                </button>
                {categories
                    .filter((cat) => cat.name?.toLowerCase() !== 'earrings')
                    .map(cat => (
                        <button
                            key={cat._id}
                            className={`filter-chip ${selectedCategory === cat._id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat._id)}
                        >
                            {cat.name === 'Briadal Collection' ? 'Bridal Collection' : cat.name}
                        </button>
                    ))}
            </div>

            {/* Product List */}
            <div className="products-list">
                {loading ? (
                    <p style={{ textAlign: 'center', color: '#888' }}>Loading products...</p>
                ) : products.map(product => (
                    <div key={product._id} className="product-card">
                        <img
                            src={`http://localhost:5001${product.imageUrl}`}
                            alt={product.name}
                            className="product-thumb"
                        />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="product-meta">
                                {product.categoryId?.name} • SKU: {product.sku}
                            </p>
                            <div className="product-badge">{product.materialType}</div>
                        </div>

                        <div className="product-actions">
                            <button className="menu-btn" onClick={() => openEditModal(product)} title="Edit">
                                <FaPen />
                            </button>
                            <button className="menu-btn delete-btn" onClick={() => handleDelete(product._id)} title="Delete" style={{ color: '#ff4444', marginLeft: '10px' }}>
                                <FaTrash />
                            </button>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={product.isActive}
                                    onChange={() => handleToggleStatus(product._id)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                ))}
                {!loading && products.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>No products found.</p>
                )}
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
                onDelete={handleDelete}
                categories={categories}
                productToEdit={productToEdit}
                defaultCategoryId={selectedCategory}
            />

            {/* Bottom Padding for Nav */}
            <div style={{ height: '80px' }}></div>
        </div>
    );
};

export default Products;
