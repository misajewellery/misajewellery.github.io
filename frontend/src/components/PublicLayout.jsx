import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import classes from './PublicLayout.module.css';
import logo from '../assets/logo.png';
import { FaWhatsapp, FaInstagram, FaSearch, FaShoppingBag, FaBars, FaArrowRight, FaPhoneAlt } from 'react-icons/fa';
import { getPublicCategories } from '../services/api';

const PublicLayout = () => {
    const navigate = useNavigate();
    const [footerCategories, setFooterCategories] = useState([]);

    const fallbackCategories = useMemo(() => ([
        { name: 'Rings', slug: 'gold-rings' },
        { name: 'Diamond Necklaces', slug: 'diamond-necklaces' },
        { name: 'Bridal Sets', slug: 'bridal-sets' },
        { name: 'Daily Wear', slug: 'daily-wear' },
        { name: 'Gifts & Coins', slug: 'gifts-coins' }
    ]), []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getPublicCategories();
                const normalized = Array.isArray(data)
                    ? data
                        .filter((category) => category?.slug && category?.name)
                        .map((category) => ({
                            name: category.name,
                            slug: category.slug
                        }))
                    : [];
                setFooterCategories(normalized);
            } catch (error) {
                console.error('Failed to load footer categories', error);
                setFooterCategories([]);
            }
        };

        fetchCategories();
    }, []);

    const collectionsToShow = footerCategories.length > 0 ? footerCategories : fallbackCategories;

    return (
        <div className={classes.layoutWrapper}>
            {/* Navbar */}
            <header className={classes.navbar}>
                <div className={classes.brand} onClick={() => navigate('/')}>
                    <img src={logo} alt="MISA Logo" className={classes.logo} />
                    <div className={classes.logoText}>
                        <span className={classes.brandName}>MISA</span>
                        <span className={classes.brandSubtitle}>Jewellery</span>
                    </div>
                </div>

                <div className={classes.navIcons}>
                    <button className={classes.navIcon}><FaSearch /></button>
                    <button className={classes.navIcon}><FaShoppingBag /></button>
                    <button className={classes.navIcon}><FaBars /></button>
                </div>
            </header>

            {/* Main Content */}
            <main className={classes.mainContent}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className={classes.footer}>
                <div className={classes.footerContent}>
                    {/* Brand Col */}
                    <div className={classes.footerCol}>
                        <div className={classes.brand} style={{ marginBottom: '20px', pointerEvents: 'none' }}>
                            <img src={logo} alt="MISA Logo" className={classes.logo} />
                            <div className={classes.logoText}>
                                <span className={classes.brandName}>MISA</span>
                                <span className={classes.brandSubtitle}>Jewellery</span>
                            </div>
                        </div>
                        <p className={classes.footerDesc}>Crafting timeless elegance in pure gold. Each piece tells a story of heritage, artistry, and eternal beauty.</p>
                        <div className={classes.socialIcons}>
                            <a className={classes.socialIcon} href="https://www.instagram.com/misa__jewellery?igsh=ZWEyMWVwNDBtNWtx" target="_blank" rel="noopener noreferrer" aria-label="Visit MISA Jewellery on Instagram"><FaInstagram /></a>
                            <a className={classes.socialIcon} href="https://wa.me/917984294889?text=Hello%20MISA%20Jewellery,%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                        </div>
                    </div>

                    {/* Collections */}
                    <div className={classes.footerCol}>
                        <h4>Collections</h4>
                        <ul>
                            {collectionsToShow.map((category) => (
                                <li key={category.slug}>
                                    <Link to={`/collections/${category.slug}`}>{category.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div className={classes.footerCol}>
                        <h4>Customer Care</h4>
                        <ul>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/whatsapp-appointment">WhatsApp Appointment</Link></li>
                            <li><Link to="/shipping-returns">Shipping & Returns</Link></li>
                            <li><Link to="/jewellery-care">Jewellery Care</Link></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Stay Connected */}
                    <div className={classes.footerCol}>
                        <h4>Stay Connected</h4>
                        <p className={classes.footerDesc}>Crafted with timeless elegance, MISA Jewellery blends heritage craftsmanship with modern luxury.</p>
                        <form className={classes.newsletterForm}>
                            <input type="email" placeholder="Your Email Address" className={classes.newsletterInput} />
                            <button type="button" className={classes.newsletterBtn}><FaArrowRight /></button>
                        </form>
                        <div className={classes.activeContact}>
                            <FaPhoneAlt /> +91 7984294889
                        </div>
                    </div>
                </div>

                <div className={classes.bottomBar}>
                    <p>&copy; {new Date().getFullYear()} ApexWebWorks - All Rights Reserved.</p>
                    <p>Website crafted by ApexWebWorks - Precision. Creativity. Performance.</p>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
