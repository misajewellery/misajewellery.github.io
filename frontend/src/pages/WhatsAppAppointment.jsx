import React, { useEffect } from 'react';
import { FaWhatsapp, FaRegCalendarCheck } from 'react-icons/fa';
import classes from './StaticPage.module.css';

const WhatsAppAppointment = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const whatsappUrl = "https://wa.me/917984294889?text=Hello%20MISA,%20I%20would%20like%20to%20book%20a%20jewellery%20appointment.";

    return (
        <div className={classes.staticPage}>
            <div className={classes.container}>
                <header className={classes.header}>
                    <h1 className={classes.title}>Book Your Jewellery Appointment</h1>
                    <p className={classes.subtitle}>Exclusive Consultation with our Experts</p>
                </header>

                <div className={classes.section}>
                    <div className={classes.content}>
                        <p>Discover the MISA experience through a personalized consultation. Whether you are looking for a bespoke bridal set, a commemorative gift, or an addition to your daily wear, our experts are here to guide you through our collections.</p>
                        <p>For your convenience, we offer instant appointment booking via WhatsApp. Skip the forms and connect with us directly to schedule your visit or a virtual consultation.</p>
                    </div>
                </div>

                <div className={classes.ctaWrapper}>
                    <FaRegCalendarCheck style={{ color: 'var(--color-gold)', fontSize: '3rem', marginBottom: '24px' }} />
                    <h3 className={classes.ctaTitle}>Chat with us to schedule your visit</h3>
                    <p className={classes.content} style={{ marginBottom: '32px' }}>Our representative will assist you in picking a time that works best for you.</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={classes.whatsappBtn}>
                        <FaWhatsapp style={{ fontSize: '1.4rem' }} /> Chat on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppAppointment;
