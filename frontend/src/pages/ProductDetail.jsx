import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaChevronLeft } from 'react-icons/fa';
import { getProductById, getImageUrl } from '../services/api';
import classes from './ProductDetail.module.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Failed to load product', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className={classes.container}>
                <p className={classes.loading}>Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className={classes.container}>
                <p className={classes.loading}>Product not found.</p>
                <button className={classes.backBtn} onClick={() => navigate(-1)}>
                    <FaChevronLeft /> Back
                </button>
            </div>
        );
    }

    return (
        <div className={classes.detailPage}>
            <div className={classes.container}>
                <button className={classes.backBtn} onClick={() => navigate(-1)}>
                    <FaChevronLeft /> Back
                </button>
                <div className={classes.card}>
                    <img
                        src={getImageUrl(product.imageUrl)}
                        alt={product.name}
                        className={classes.image}
                    />
                    <div className={classes.info}>
                        <h1 className={classes.title}>{product.name}</h1>
                        <p className={classes.meta}>Material: {product.materialType}</p>
                        {product.productNumber !== undefined && product.productNumber !== null && (
                            <p className={classes.meta}>Product No: {product.productNumber}</p>
                        )}
                        <p className={classes.meta}>SKU: {product.sku}</p>
                        <p className={classes.description}>
                            {product.description}
                        </p>
                        <div className={classes.actions}>
                            <button
                                className={classes.inquiryBtn}
                                onClick={() => window.open(
                                    `https://wa.me/917984294889?text=Hello%20MISA%20Jewellery,%20I%20am%20interested%20in%20${encodeURIComponent(product.name)} (Ref: ${product.sku}).`,
                                    '_blank',
                                    'noopener,noreferrer'
                                )}
                            >
                                <FaWhatsapp /> Inquiry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
