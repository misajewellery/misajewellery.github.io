import React, { useState } from 'react';
import { FaUser, FaLock, FaBell, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import classes from './Settings.module.css';

const Settings = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={classes.container}>
            <div className={classes.tabs}>
                <div className={`${classes.tab} ${classes.active}`}>Profile</div>
                <div className={classes.tab}>Security</div>
                <div className={classes.tab}>Notifications</div>
            </div>

            <div className={classes.content}>
                {/* Profile Section */}
                <div className={classes.section}>
                    <h3>Profile Information</h3>
                    <div className={classes.profileHeader}>
                        <div className={classes.avatar}>AD</div>
                        <div className={classes.uploadBtn}>Change Photo</div>
                    </div>
                    <form className={classes.form}>
                        <div className={classes.formGroup}>
                            <label>Full Name</label>
                            <input type="text" defaultValue="Admin User" />
                        </div>
                        <div className={classes.formGroup}>
                            <label>Email Address</label>
                            <input type="email" defaultValue="admin@misa.app" />
                        </div>
                        <button className={classes.saveBtn}>Save Changes</button>
                    </form>
                </div>

                <hr className={classes.divider} />

                {/* Appearance */}
                <div className={classes.section}>
                    <h3>Appearance</h3>
                    <div className={classes.settingRow}>
                        <div className={classes.settingInfo}>
                            <div className={classes.iconBox}><FaMoon /></div>
                            <div>
                                <h4>Dark Mode</h4>
                                <p>Toggle dark theme for the application</p>
                            </div>
                        </div>
                        <label className={classes.switch}>
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />
                            <span className={classes.slider}></span>
                        </label>
                    </div>
                </div>

                <hr className={classes.divider} />

                {/* Account Actions */}
                <div className={classes.section}>
                    <h3>Account Actions</h3>
                    <button className={classes.logoutBtn}>
                        <FaSignOutAlt /> Log Out
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Settings;
