import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaThLarge, FaBox, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import '../styles/BottomNav.css';

const BottomNav = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <nav className="bottom-nav">
            <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
                <FaThLarge className="nav-icon" />
                <span className="nav-label">Home</span>
            </NavLink>
            <NavLink to="/admin/products" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                <FaBox className="nav-icon" />
                <span className="nav-label">Products</span>
            </NavLink>
            <NavLink to="/admin/sales" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                <FaChartBar className="nav-icon" />
                <span className="nav-label">Sales</span>
            </NavLink>
            <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                <FaCog className="nav-icon" />
                <span className="nav-label">Settings</span>
            </NavLink>
            <button type="button" className="nav-item nav-button logout" onClick={handleLogout}>
                <FaSignOutAlt className="nav-icon" />
                <span className="nav-label">Logout</span>
            </button>
        </nav>
    );
};

export default BottomNav;
