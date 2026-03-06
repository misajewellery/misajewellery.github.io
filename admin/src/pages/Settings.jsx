import React, { useState } from 'react';
import { FaBell, FaShieldAlt, FaPalette, FaStore, FaUserCog } from 'react-icons/fa';
import '../styles/Settings.css';

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [secureModeEnabled, setSecureModeEnabled] = useState(true);
    const [compactViewEnabled, setCompactViewEnabled] = useState(false);

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1>Settings Center</h1>
                <p>Customize your admin experience and preferences</p>
            </div>

            <div className="settings-grid">
                <section className="settings-card">
                    <div className="settings-card-title">
                        <FaStore />
                        <h2>Store Profile</h2>
                    </div>
                    <div className="settings-field">
                        <label>Store Name</label>
                        <input type="text" value="MISA Jewellery" disabled />
                    </div>
                    <div className="settings-field">
                        <label>Store Email</label>
                        <input type="text" value="misajewelleryadmin@gmail.com" disabled />
                    </div>
                    <div className="settings-field">
                        <label>Default Currency</label>
                        <input type="text" value="INR (₹)" disabled />
                    </div>
                </section>

                <section className="settings-card">
                    <div className="settings-card-title">
                        <FaUserCog />
                        <h2>Admin Account</h2>
                    </div>
                    <div className="settings-field">
                        <label>Username</label>
                        <input type="text" value="admin" disabled />
                    </div>
                    <div className="settings-field">
                        <label>Access Level</label>
                        <input type="text" value="Super Admin" disabled />
                    </div>
                    <div className="settings-note">Profile edit controls can be connected to backend in next step.</div>
                </section>

                <section className="settings-card">
                    <div className="settings-card-title">
                        <FaShieldAlt />
                        <h2>Security</h2>
                    </div>
                    <button
                        type="button"
                        className="toggle-row"
                        onClick={() => setSecureModeEnabled((prev) => !prev)}
                    >
                        <span>Secure Mode</span>
                        <span className={`toggle-pill ${secureModeEnabled ? 'on' : ''}`}>{secureModeEnabled ? 'ON' : 'OFF'}</span>
                    </button>
                    <div className="settings-note">When enabled, actions require stricter validation checks.</div>
                </section>

                <section className="settings-card">
                    <div className="settings-card-title">
                        <FaBell />
                        <h2>Notifications</h2>
                    </div>
                    <button
                        type="button"
                        className="toggle-row"
                        onClick={() => setNotificationsEnabled((prev) => !prev)}
                    >
                        <span>System Alerts</span>
                        <span className={`toggle-pill ${notificationsEnabled ? 'on' : ''}`}>{notificationsEnabled ? 'ON' : 'OFF'}</span>
                    </button>
                    <div className="settings-note">Receive updates for product and category actions.</div>
                </section>

                <section className="settings-card settings-card-wide">
                    <div className="settings-card-title">
                        <FaPalette />
                        <h2>Display Preferences</h2>
                    </div>
                    <button
                        type="button"
                        className="toggle-row"
                        onClick={() => setCompactViewEnabled((prev) => !prev)}
                    >
                        <span>Compact View</span>
                        <span className={`toggle-pill ${compactViewEnabled ? 'on' : ''}`}>{compactViewEnabled ? 'ON' : 'OFF'}</span>
                    </button>
                    <div className="settings-note">Compact view keeps cards denser for faster management.</div>
                </section>
            </div>

            <div className="settings-footer-msg">
                Settings saved locally for this session.
            </div>
        </div>
    );
};

export default Settings;
