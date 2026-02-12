import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaLock, FaUserShield, FaClipboardCheck } from 'react-icons/fa';
import { IoDiamond } from 'react-icons/io5';
import '../styles/AdminLogin.css';

function AdminLogin() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(formData.email, formData.password);
        if (success) {
            navigate('/admin');
        }
        setLoading(false);
    };

    return (
        <div className="admin-login-container">
            <div className="login-content">
                <div className="logo-section">
                    <IoDiamond className="misa-logo-icon" />
                    <h1 className="brand-title">MISA</h1>
                    <h2 className="portal-subtitle">Admin Portal</h2>
                    <p className="tagline">Secure access for inventory & content management</p>
                </div>

                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="input-label">EMAIL</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="admin@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label htmlFor="password" className="input-label">PASSWORD</label>
                                <div className="forgot-password-row" style={{ marginTop: 0, marginBottom: '0.8rem' }}>
                                    <button type="button" className="forgot-link" style={{ background: 'none', border: 'none', padding: 0 }}>Forgot password?</button>
                                </div>
                            </div>

                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="••••••••"
                                    style={{ letterSpacing: '2px' }}
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="options-row">
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                            <span className="remember-label">Remember this device</span>
                        </div>

                        <button type="submit" className="submit-btn" style={{ marginBottom: '2rem' }} disabled={loading}>
                            {loading ? 'SIGNING IN...' : 'SIGN IN'}
                        </button>

                        <div className="divider"></div>

                        <div className="security-badges">
                            <div className="badge">
                                <FaLock className="badge-icon" />
                                <span className="badge-text">Encrypted<br />Session</span>
                            </div>
                            <div className="badge">
                                <FaUserShield className="badge-icon" />
                                <span className="badge-text">Role<br />Access</span>
                            </div>
                            <div className="badge">
                                <FaClipboardCheck className="badge-icon" />
                                <span className="badge-text">Audit<br />Logs</span>
                            </div>
                        </div>
                    </form>
                </div>

                <footer className="login-footer">
                    <p className="copyright">© 2024 MISA Jewellery. Admin System.</p>
                </footer>
            </div>
        </div>
    );
}

export default AdminLogin;
