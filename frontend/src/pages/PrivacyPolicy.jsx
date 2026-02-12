import React, { useEffect } from 'react';
import classes from './StaticPage.module.css';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={classes.staticPage}>
            <div className={classes.container}>
                <header className={classes.header}>
                    <h1 className={classes.title}>Privacy Policy</h1>
                    <p className={classes.subtitle}>Your Trust, Our Priority</p>
                </header>

                <div className={classes.section}>
                    <h2 className={classes.sectionTitle}>Overview</h2>
                    <div className={classes.content}>
                        <p>At MISA Jewellery, we are committed to protecting the privacy of our esteemed clientele. This policy outlines how we collect, use, and safeguard your personal information when you interact with our website and services.</p>
                    </div>
                </div>

                <div className={classes.section}>
                    <h2 className={classes.sectionTitle}>Data Collection & Usage</h2>
                    <div className={classes.content}>
                        <p>We collect information that you provide to us directly, such as when you initialize a WhatsApp inquiry, subscribe to our newsletter, or create an account for a seamless shopping experience.</p>
                        <ul>
                            <li><strong>Personal Details:</strong> Name, email address, and phone number for communication and service fulfillment.</li>
                            <li><strong>Inquiry Data:</strong> Details of the jewellery pieces you are interested in via our WhatsApp gated inquiry system.</li>
                            <li><strong>Technical Data:</strong> Cookie usage to improve website performance and personalize your browsing experience.</li>
                        </ul>
                    </div>
                </div>

                <div className={classes.section}>
                    <h2 className={classes.sectionTitle}>WhatsApp & External Links</h2>
                    <div className={classes.content}>
                        <p>Our website utilizes external links to WhatsApp for inquiries and appointments. Please note that once you leave our site, your interactions are governed by WhatsApp's own privacy policy. We ensure that the data passed (such as product names in inquiries) is used solely to assist you with your request.</p>
                    </div>
                </div>

                <div className={classes.section}>
                    <h2 className={classes.sectionTitle}>Data Protection</h2>
                    <div className={classes.content}>
                        <p>We implement state-of-the-art security measures to protect your data against unauthorized access, alteration, or disclosure. We never sell or rent your personal information to third parties.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
