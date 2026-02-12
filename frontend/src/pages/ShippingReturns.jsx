import React, { useEffect } from 'react';
import classes from './StaticPage.module.css';

const ShippingReturns = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={classes.staticPage}>
            <div className={classes.container}>
                <header className={classes.header}>
                    <h1 className={classes.title}>Shipping & Returns</h1>
                    <p className={classes.subtitle}>Policies and Procedures</p>
                </header>

                <div className={classes.section}>
                    <h2 className={classes.sectionTitle}>Shipping Policy</h2>
                    <div className={classes.content}>
                        <p>MISA Jewellery provides secure and insured shipping for all our products across India. We ensure that your precious purchases reach you in perfect condition and with full safety.</p>
                        <ul>
                            <li><strong>Shipping Timelines:</strong> Standard orders are processed within 3-5 business days. Bespoke or customized pieces may take 15-20 days depending on the craftsmanship required.</li>
                            <li><strong>Delivery Locations:</strong> We deliver to over 20,000 pin codes across India. For international inquiries, please contact our support team.</li>
                            <li><strong>Shipping Charges:</strong> We offer complimentary insured shipping on all orders above ₹50,000. For orders below this value, a nominal fee may apply.</li>
                            <li><strong>Insurance:</strong> Every shipment is fully insured by MISA Jewellery until it reaches your doorstep for your absolute peace of mind.</li>
                        </ul>
                    </div>
                </div>

                <div className={classes.section}>
                    <h2 className={classes.sectionTitle}>Returns & Exchange</h2>
                    <div className={classes.content}>
                        <p>We take immense pride in our quality and craftsmanship. However, if you are not entirely satisfied with your purchase, we offer a transparent return and exchange policy.</p>
                        <ul>
                            <li><strong>Return Eligibility:</strong> Items must be returned within 7 days of delivery in their original, unused condition with all certificates and packaging intact.</li>
                            <li><strong>Exchanges:</strong> We offer a 100% exchange value on your gold jewellery (based on current market rates) should you choose to upgrade to a new piece.</li>
                            <li><strong>Refund Process:</strong> Once approved, refunds are processed within 7-10 working days to the original payment method.</li>
                            <li><strong>Non-Returnable Items:</strong> Customized jewellery, engraved pieces, and nose-pins are not eligible for returns due to hygiene and personalization factors.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingReturns;
