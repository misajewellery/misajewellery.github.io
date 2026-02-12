import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaLayerGroup, FaCheckCircle, FaTimesCircle, FaPlus, FaGem, FaCloudUploadAlt, FaShoppingBag } from 'react-icons/fa'; // Icons matching screenshot roughly
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
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data);
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

            <h2 className="section-title">Recent Sales Activity</h2>
            <div className="activity-list">
                {/* Mock/Static Data as per screenshot since backend doesn't support sales yet */}
                <div className="activity-item">
                    <div className="activity-icon-box"><FaShoppingBag /></div>
                    <div className="activity-details">
                        <div className="activity-name">Diamond Halo Ring</div>
                        <div className="activity-time">2 minutes ago</div>
                    </div>
                    <div className="activity-price">$4,250</div>
                </div>
                <div className="activity-item">
                    <div className="activity-icon-box"><FaShoppingBag /></div>
                    <div className="activity-details">
                        <div className="activity-name">Gold Chain Necklace</div>
                        <div className="activity-time">45 minutes ago</div>
                    </div>
                    <div className="activity-price">$890</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
