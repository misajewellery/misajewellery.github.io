import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartPie, FaList, FaTags, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';
import classes from './Layout.module.css';

const Sidebar = () => {
    const navItems = [
        { icon: <FaChartPie />, label: 'Dashboard', path: '/dashboard' },
        { icon: <FaList />, label: 'Expenses', path: '/expenses' },
        { icon: <FaTags />, label: 'Categories', path: '/categories' },
        { icon: <FaChartLine />, label: 'Reports', path: '/reports' },
        { icon: <FaCog />, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className={classes.sidebar}>
            <div className={classes.logoContainer}>
                <div className={classes.logoText}>MISA <span>App</span></div>
            </div>

            <nav className={classes.navMenu}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `${classes.navItem} ${isActive ? classes.activeNav : ''}`
                        }
                    >
                        <span className={classes.navIcon}>{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className={classes.userProfile}>
                <div className={classes.avatar}>AD</div>
                <div className={classes.userInfo}>
                    <h4>Admin User</h4>
                    <p>Pro Plan</p>
                </div>
                <button className={classes.actionBtn} style={{ marginLeft: 'auto' }}>
                    <FaSignOutAlt />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
