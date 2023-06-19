import styles from './ProductDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductDetails } from '../../actions/productActions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Loader from '../layout/Loader/Loader';
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);

    const options = {
        edit: true,
        value: product.rating,
        isHalf: true,
        size: 32
    }

    useEffect(() => {
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id]);

    const productName = (product.name) ? product.name.toUpperCase() : "";

    return (
        <div className={styles['container']}>
            <div className={styles['carousel-container']}>
                {product.images && <Carousel className={styles['image']}>
                    {product.images.map((img) => {
                        return (
                            <img
                                className={styles['image']}
                                src={img.url}
                                alt={product.name}
                            />
                        )
                    })}
                </Carousel>}
            </div>

            <div className={styles['details-container']}>
                <div className={styles['large']}>{productName}</div>
                <div><strong>ID:</strong> {product._id}</div>
                <div className={styles['large']}>Price: ₹{product.price}</div>
                <div>Description: {product.description}</div>
                <div className={product.stock < 1 ? styles['danger'] : styles['success']}>Stock: {product.stock < 1 ? "Out of stock" : "In stock"}</div>
                <div>
                    <button>-</button>
                    <input type="number" value="1"></input>
                    <button>+</button>
                </div>
                <div>
                    <ReactStars {...options} />
                    <div>({product.numberOfReviews} Reviews)</div>
                </div>
                <button>Submit Review</button>
            </div>
        </div>
    );
}

export default ProductDetails;