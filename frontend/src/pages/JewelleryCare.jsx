import React, { useEffect } from 'react';
import classes from './StaticPage.module.css';

const JewelleryCare = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={classes.staticPage}>
            <div className={classes.container}>
                <header className={classes.header}>
                    <h1 className={classes.title}>Jewellery Care</h1>
                    <p className={classes.subtitle}>Maintain Eternal Brilliance</p>
                </header>

                <div className={classes.section}>
                    <h2 className={classes.sectionTitle}>Gold Jewellery Care</h2>
                    <div className={classes.content}>
                        <p>Gold is a timeless metal, but it needs care to maintain its luster. Regular exposure to household chemicals, perfume, and hairspray can dull its appearance.</p>
                        <ul>
                            <li>Store each piece separately in a soft-lined box or pouch to prevent scratching.</li>
                            <li>Clean your gold jewellery in a bowl of warm water with a few drops of mild detergent. Rinse thoroughly and pat dry with a soft, lint-free cloth.</li>
                            <li>Remove jewellery before swimming in chlorinated pools or using hot tubs.</li>
                        </ul>
                    </div>
                </div>

                <div className={classes.section}>
                    <h2 className={classes.sectionTitle}>Diamond & Gemstone Care</h2>
                    <div className={classes.content}>
                        <p>Diamonds are the hardest natural substance, but they can still be chipped by a sharp blow and can easily lose their sparkle due to oils and dust.</p>
                        <ul>
                            <li>Avoid touching your diamonds frequently; the oil from your fingers can create a film on the stone.</li>
                            <li>Clean your diamonds regularly using a soft brush and a mild cleaning solution.</li>
                            <li>Check the settings regularly to ensure the stones are secure. We offer complimentary checking at our store.</li>
                        </ul>
                    </div>
                </div>

                <div className={classes.section}>
                    <h2 className={classes.sectionTitle}>General Storage Tips</h2>
                    <div className={classes.content}>
                        <p>Proper storage is essential to keep your jewellery looking new for years to come.</p>
                        <ul>
                            <li>Keep your jewellery in a cool, dry place away from direct sunlight.</li>
                            <li>Use anti-tarnish strips in your jewellery box to absorb moisture and prevent tarnishing.</li>
                            <li>Fasten chains and necklaces before storing them to prevent tangling.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JewelleryCare;
