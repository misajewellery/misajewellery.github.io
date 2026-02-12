import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useInquiry } from '../hooks/useInquiry';

import { getPublicProducts, getImageUrl } from '../services/api';
import classes from './CollectionPage.module.css';


const CollectionPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { saveInquiry } = useInquiry();
    const [activeFilter, setActiveFilter] = useState('All');

    const handleInquiryAction = (product, whatsappUrl) => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Pass category slug to backend
                const data = await getPublicProducts({ category: category, status: 'active' });
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        window.scrollTo(0, 0);
    }, [category]);

    const filteredProducts = products.filter(p =>
        (activeFilter === 'All' || p.materialType === activeFilter)
    );

    const categoryNames = {
        'gold-rings': 'Rings',
        'diamond-necklaces': 'Diamond Necklaces',
        'bridal-sets': 'Bridal Sets',
        'daily-wear': 'Daily Wear',
        'gifts-coins': 'Gifts & Coins',
        'earrings': 'Earrings',
        'bangles': 'Bangles'
    };

    const categoryTitle = categoryNames[category] || category.replace('-', ' ');

    return (
        <div className={classes.collectionPage}>
            <div className={classes.container}>
                <header className={classes.header}>
                    <h1 className={classes.title}>{categoryTitle}</h1>
                    <p className={classes.subtitle}>Exquisite Craftsmanship & Timeless Design</p>
                </header>

                <div className={classes.filterBar}>
                    {['All', 'Gold', 'Silver', 'Silver With Diamond', 'Gold With Diamond'].map((filter) => (
                        <button
                            key={filter}
                            className={`${classes.filterBtn} ${activeFilter === filter ? classes.active : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {filteredProducts.length > 0 ? (
                    <div className={classes.productGrid}>
                        {filteredProducts.map((product) => (
                            <div key={product._id} className={classes.productCard}>
                                <img
                                    src={getImageUrl(product.imageUrl)}
                                    alt={product.name}
                                    className={classes.productImg}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            navigate(`/product/${product._id}`);
                                        }
                                    }}
                                />
                                <div className={classes.productInfo}>
                                    <h3 className={classes.productName}>{product.name}</h3>
                                    <div className={classes.productMeta}>
                                        <span>{product.materialType}</span>
                                        {product.productNumber !== undefined && product.productNumber !== null && (
                                            <span>Product No: {product.productNumber}</span>
                                        )}
                                        {/* <span>{product.weight}</span> */}
                                    </div>

                                    <div className={classes.productActions}>
                                        <button
                                            className={classes.btnDetails}
                                            onClick={() => navigate(`/product/${product._id}`)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleInquiryAction(product, `https://wa.me/917984294889?text=Hello%20MISA%20Jewellery,%20I%20am%20interested%20in%20${encodeURIComponent(product.name)} (Ref: ${product.sku}).`)}
                                            className={classes.btnInquiry}
                                        >
                                            <FaWhatsapp /> Inquiry
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={classes.noProducts}>
                        <p>Currently no products available in this collection. Please check back soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionPage;
