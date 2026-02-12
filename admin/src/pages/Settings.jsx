import React from 'react';
import '../styles/Dashboard.css'; // Reuse dashboard styles

const Settings = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Settings</h1>
            <div style={{ marginTop: '30px', color: '#ccc' }}>
                <div className="form-group">
                    <label>Store Name</label>
                    <input type="text" value="MISA Jewellery" disabled className="form-input" style={{ maxWidth: '400px' }} />
                </div>
                <div className="form-group">
                    <label>Admin Email</label>
                    <input type="text" value="admin@misa.com" disabled className="form-input" style={{ maxWidth: '400px' }} />
                </div>
                <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '20px' }}>More settings coming soon.</p>
            </div>
        </div>
    );
};

export default Settings;
