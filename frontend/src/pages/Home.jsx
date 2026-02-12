import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useInquiry } from '../hooks/useInquiry';
import classes from './Home.module.css';
import logo from '../assets/logo.png';
import necklaceFloral from '../assets/necklace_floral.png';
import ringSolitaire from '../assets/ring_solitaire.png';
import bridalSet from '../assets/bridal_set.png';
import goldChain from '../assets/gold_chain.png';
import earrings from '../assets/earrings.jpeg';
import bangles from '../assets/bangles.jpeg';
import necklaces from '../assets/necklaces.jpeg';
import rings from '../assets/rings.jpeg';
import bridal from '../assets/bridal.jpeg';
import { FaWhatsapp, FaMedal, FaTags, FaStore, FaLock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { getPublicProducts, getPublicCategories, getImageUrl } from '../services/api';

// Placeholder images from legacy site or unsplash if not available
// In a real scenario, we'd use the exact same images from the legacy site.
const images = {
    ring: rings,
    necklace: necklaces,
    bridal: bridal,
    bangle: bangles,
    earrings: earrings,
    chain: goldChain // Verified Local Image
};

const Home = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { saveInquiry } = useInquiry();

    const handleInquiryAction = (product, whatsappUrl) => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };
    const scrollRef = useRef(null);
    const headerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getPublicProducts({ status: 'active' });
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getPublicCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories", error);
            } finally {
                setCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Track scroll for center card scaling
    const handleScroll = () => {
        if (!scrollRef.current) return;
        const containerCenter = scrollRef.current.offsetWidth / 2;
        const cards = scrollRef.current.querySelectorAll(`.${classes.signatureCard}`);

        let minDistance = Infinity;
        let centeredIndex = 0;

        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const containerRect = scrollRef.current.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
            const distance = Math.abs(containerCenter - cardCenter);

            if (distance < minDistance) {
                minDistance = distance;
                centeredIndex = index;
            }
        });

        setActiveIndex(centeredIndex);
    };

    useEffect(() => {
        const rail = scrollRef.current;
        if (rail) {
            rail.addEventListener('scroll', handleScroll);
            setTimeout(handleScroll, 100);
        }
        window.addEventListener('resize', handleScroll);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsHeaderVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => {
            if (rail) rail.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (headerRef.current) observer.unobserve(headerRef.current);
        };
    }, []);

    // Drag to scroll logic
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = 400;
        if (direction === 'left') {
            current.scrollLeft -= scrollAmount;
        } else {
            current.scrollLeft += scrollAmount;
        }
    };

    // Staggered card animation logic
    // const signatureProducts = products.filter(p => p.isSignature || p.isFavorite);
    // Since backend doesn't have signature flag yet, show latest 10 products
    const signatureProducts = products.slice(0, 10);

    return (
        <div>
            {/* Hero Section */}
            <section className={classes.hero}>
                <div className={classes.heroOverlay}></div>
                <div className={classes.heroContainer}>
                    <div className={classes.heroContent}>
                        <h1 className={classes.heroTitle}>
                            <span>Pure Gold.</span> Timeless Craftsmanship.
                        </h1>
                        <p className={classes.heroSubtitle}>
                            Trusted jewellery for every occasion
                        </p>
                        <div className={classes.heroButtons}>
                            <a href="#trending" className={classes.btnPrimary}>Shop Collection</a>
                            <button
                                onClick={() => handleInquiryAction(null, "https://wa.me/917984294889?text=Hello%20MISA%20Jewellery,%20I%20am%20interested%20to%20know%20more%20about%20your%20collection.")}
                                className={classes.btnSecondary}
                            >
                                <FaWhatsapp style={{ marginRight: '8px' }} /> WhatsApp Inquiry
                            </button>
                        </div>
                    </div>
                    <div className={classes.heroLogoSection}>
                        <img src={logo} alt="MISA Luxury Logo" className={classes.heroBigLogo} />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className={classes.section}>
                <h2 className={classes.sectionTitle}>Shop By Category</h2>
                <div className={classes.categoryGrid}>
                    {(() => {
                        const fallbackCategories = [
                            { name: 'Rings', slug: 'rings', image: images.ring },
                            { name: 'Necklaces', slug: 'necklaces', image: images.necklace },
                            { name: 'Bridal Collection', slug: 'bridal-sets', image: images.bridal },
                            { name: 'Bangles', slug: 'bangles', image: images.bangle },
                            { name: 'Earrings', slug: 'earrings', image: images.earrings },
                        ];

                        const displayedCategories = categories.length ? categories : fallbackCategories;

                        if (categoriesLoading && !categories.length) {
                            return <p>Loading...</p>;
                        }

                        return displayedCategories.map((category) => {
                            const imageSrc = category.imageUrl
                                ? getImageUrl(category.imageUrl)
                                : category.image || images.ring;

                            return (
                                <div
                                    key={category._id || category.slug}
                                    className={classes.categoryCard}
                                    onClick={() => navigate(`/collections/${category.slug}`)}
                                >
                                    <img src={imageSrc} alt={category.name} className={classes.categoryImg} />
                                    <div className={classes.categoryOverlay}>
                                        <div className={classes.categoryName}>{category.name}</div>
                                    </div>
                                </div>
                            );
                        });
                    })()}
                </div>
            </section>

            {/* MISA Signature Picks (Replaces Trending Section) */}
            <section className={classes.signatureSection}>
                <div
                    ref={headerRef}
                    className={`${classes.signatureHeader} ${isHeaderVisible ? classes.signatureHeaderActive : ''}`}
                >
                    <h2 className={classes.sectionTitle}>Timeless Creations</h2>
                    <p className={classes.signatureSubtitle}>Handcrafted jewellery inspired by timeless elegance.</p>
                </div>

                <div className={classes.scrollContainerWrapper}>
                    <button className={`${classes.navBtn} ${classes.prevBtn}`} onClick={() => scroll('left')}>
                        <FaChevronLeft />
                    </button>

                    <div
                        className={classes.scrollRail}
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        <div className={classes.edgeFadeLeft}></div>

                        {signatureProducts.map((product, index) => (
                            <div
                                key={product._id}
                                className={`${classes.signatureCard} ${isHeaderVisible ? classes.signatureCardActive : ''} ${activeIndex === index ? classes.centerCard : ''}`}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                {/* {product.isSignature && <span className={classes.cardBadge}>Signature Pick</span>} */}
                                {/* {product.isFavorite && <span className={classes.cardBadge}>Customer Favorite</span>} */}

                                <img
                                    src={getImageUrl(product.imageUrl)}
                                    alt={product.name}
                                    className={classes.productImg}
                                    draggable="false"
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
                                        {/* <span>{product.weight}</span> -- Weight not in backend model yet */}
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

                        <div className={classes.edgeFadeRight}></div>
                    </div>

                    <button className={`${classes.navBtn} ${classes.nextBtn}`} onClick={() => scroll('right')}>
                        <FaChevronRight />
                    </button>
                </div>

            </section>

            {/* Trust Section */}
            <section className={classes.trustSection}>
                <div className={classes.trustGrid}>
                    <div className={classes.trustItem}>
                        <FaMedal />
                        <h4>BIS Hallmarked</h4>
                        <p>100% Certified Purity</p>
                    </div>
                    <div className={classes.trustItem}>
                        <FaTags />
                        <h4>Transparent Pricing</h4>
                        <p>No hidden charges</p>
                    </div>
                    <div className={classes.trustItem}>
                        <FaStore />
                        <h4>Trusted Store</h4>
                        <p>Serving since 1995</p>
                    </div>
                    <div className={classes.trustItem}>
                        <FaLock />
                        <h4>Secure Payments</h4>
                        <p>100% Safe transactions</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
