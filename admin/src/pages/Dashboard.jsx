import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaLayerGroup, FaCheckCircle, FaTimesCircle, FaPlus, FaGem, FaCloudUploadAlt, FaShoppingBag, FaTag } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../styles/Dashboard.css'; // I will create this css file

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCategories: 0,
        totalProducts: 0,
        activeProducts: 0,
        inactiveProducts: 0
    });
    const [recentAdded, setRecentAdded] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const formatTime = (dateValue) => {
        const date = new Date(dateValue);
        if (Number.isNaN(date.getTime())) return 'Just now';

        const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} min ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hr ago`;

        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [{ data: statsData }, { data: productsData }, { data: categoriesData }] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/products'),
                    api.get('/admin/categories')
                ]);

                setStats(statsData);

                const recentProducts = productsData.map((product) => ({
                    id: product._id,
                    type: 'Product',
                    name: product.name,
                    createdAt: product.createdAt
                }));

                const recentCategories = categoriesData.map((category) => ({
                    id: category._id,
                    type: 'Category',
                    name: category.name,
                    createdAt: category.createdAt
                }));

                const combinedRecent = [...recentProducts, ...recentCategories]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);

                setRecentAdded(combinedRecent);
            } catch (error) {
                toast.error('Failed to load stats');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header-row">
                <h1 className="dashboard-title">Inventory Overview</h1>
                <span className="live-updates">LIVE UPDATES</span>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper"><FaLayerGroup className="stat-icon" /></div>
                    <div className="stat-value">{stats.totalCategories}</div>
                    <div className="stat-label">TOTAL CATEGORIES</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper"><FaBox className="stat-icon" /></div>
                    <div className="stat-value">{stats.totalProducts}</div>
                    <div className="stat-label">TOTAL PRODUCTS</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper"><FaCheckCircle className="stat-icon success" /></div>
                    <div className="stat-value">{stats.activeProducts}</div>
                    <div className="stat-label">ACTIVE PRODUCTS</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper"><FaTimesCircle className="stat-icon danger" /></div>
                    <div className="stat-value">{stats.inactiveProducts}</div>
                    <div className="stat-label">INACTIVE PRODUCTS</div>
                </div>
            </div>

            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
                <button className="action-btn" onClick={() => navigate('/admin/categories')}>
                    <div className="action-content">
                        <FaPlus className="action-icon-circle" />
                        <span>Add New Category</span>
                    </div>
                    <span className="arrow">›</span>
                </button>
                <button className="action-btn" onClick={() => navigate('/admin/products')}>
                    <div className="action-content">
                        <FaGem className="action-icon-gold" />
                        <span>Add New Product</span>
                    </div>
                    <span className="arrow">›</span>
                </button>
                <button className="action-btn" onClick={() => navigate('/admin/products')}>
                    {/* Re-using products for media currently */}
                    <div className="action-content">
                        <FaCloudUploadAlt className="action-icon-gold" />
                        <span>Upload Media Assets</span>
                    </div>
                    <span className="arrow">›</span>
                </button>
            </div>

            <h2 className="section-title">Recent Added</h2>
            <div className="activity-list">
                {recentAdded.length > 0 ? recentAdded.map((item) => (
                    <div className="activity-item" key={`${item.type}-${item.id}`}>
                        <div className="activity-icon-box">
                            {item.type === 'Product' ? <FaShoppingBag /> : <FaTag />}
                        </div>
                        <div className="activity-details">
                            <div className="activity-name">{item.name}</div>
                            <div className="activity-time">{formatTime(item.createdAt)}</div>
                        </div>
                        <div className="activity-type">{item.type}</div>
                    </div>
                )) : (
                    <div className="activity-item">
                        <div className="activity-details">
                            <div className="activity-name">No recent items</div>
                            <div className="activity-time">Add products or categories to view them here</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
