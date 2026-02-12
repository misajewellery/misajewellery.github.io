import React, { useEffect } from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import classes from './StaticPage.module.css';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const whatsappUrl = "https://wa.me/917984294889?text=Hello%20MISA%20Jewellery,%20I%20would%20like%20to%20contact%20customer%20support.";

    return (
        <div className={classes.staticPage}>
            <div className={classes.container}>
                <header className={classes.header}>
                    <h1 className={classes.title}>Contact Us</h1>
                    <p className={classes.subtitle}>We Are Here To Assist You</p>
                </header>

                <div className={classes.section}>
                    <div className={classes.content}>
                        <p>At MISA Jewellery, we value every interaction. Whether you have a question about our collections, need assistance with an order, or want to share your experience, our team is dedicated to providing you with premium support.</p>
                    </div>
                </div>

                <div className={classes.contactInfo}>
                    <div className={classes.infoItem}>
                        <FaPhoneAlt style={{ color: 'var(--color-gold)', fontSize: '1.5rem', marginBottom: '15px' }} />
                        <span className={classes.infoLabel}>Call Us</span>
                        <span className={classes.infoValue}>+91 79842 94889</span>
                    </div>
                </div>

                <div className={classes.ctaWrapper}>
                    <h3 className={classes.ctaTitle}>Prefer Instant Messaging?</h3>
                    <p className={classes.content}>Chat with our customer representative directly on WhatsApp for immediate assistance.</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={classes.whatsappBtn}>
                        <FaWhatsapp style={{ fontSize: '1.4rem' }} /> Chat on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
