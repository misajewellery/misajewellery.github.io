import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBell, FaSearch } from 'react-icons/fa';
import classes from './Layout.module.css';

const Layout = () => {
    const location = useLocation();

    // Helper to get page title based on path
    const getPageTitle = (pathname) => {
        const path = pathname.split('/')[1];
        if (!path) return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    }

    return (
        <div className={classes.layoutWrapper}>
            <Sidebar />
            <main className={classes.mainContent}>
                <header className={classes.header}>
                    <div className={classes.pageTitle}>
                        {getPageTitle(location.pathname)}
                    </div>
                    <div className={classes.headerActions}>
                        <button className={classes.actionBtn}>
                            <FaSearch />
                        </button>
                        <button className={classes.actionBtn}>
                            <FaBell />
                            <span className={classes.badge}>3</span>
                        </button>
                    </div>
                </header>
                <div className={classes.contentContainer}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
