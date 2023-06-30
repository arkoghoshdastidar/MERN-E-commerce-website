import styles from './ProductDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetails } from '../../actions/productActions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Loader from '../layout/Loader/Loader';
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard.js';
import NoReview from './NoReview.js';
import { useAlert } from 'react-alert'
import { clearError } from '../../actions/productActions';

const ProductDetails = () => {
    const [count, setCount] = useState(0);
    const params = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);
    const alert = useAlert();

    useEffect(() => {
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id]);

    if (error) {
        alert.show(error);
        dispatch(clearError());
    }
    
    const options = {
        edit: true,
        value: (product) ? product.rating : 0,
        isHalf: true,
        size: 32
    }

    const addOne = () => {
        if (count < product.stock) {
            setCount(count + 1);
        }
    }

    const subOne = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const productName = (product && product.name) ? product.name.toUpperCase() : " ";

    return (
        <>
            <div className={styles['container']}>
                {loading ? <Loader /> : product &&
                    <>
                        <div className={styles['carousel-container']}>
                            {product.images && <Carousel className={styles['image']}>
                                {product.images.map((img) => {
                                    return (
                                        <img
                                            key={img._id}
                                            src={img.url}
                                            alt={product.name}
                                        />
                                    )
                                })}
                            </Carousel>}
                        </div>
                        <div className={styles['details-container']}>
                            <div className={styles['large']}><strong>{productName}</strong></div>
                            <div><strong>ID:</strong> {product._id}</div>
                            <div className={styles['large']}><strong>Price: ₹{product.price}</strong></div>
                            <div><strong>Description: </strong>{product.description}</div>
                            <div><strong>Stock: </strong>
                                <span className={product.stock < 1 ? styles['danger'] : styles['success']}>
                                    {product.stock < 1 ? " Out of stock " : " In stock "}
                                </span>
                                <small>({product.stock} {product.stock > 1 ? " items remaining" : " item remaining"})</small>
                            </div>
                            <div>
                                <button onClick={subOne}>-</button>
                                <input type="number" value={count} readOnly min={0}></input>
                                <button onClick={addOne}>+</button>
                            </div>
                            <button >Add to cart</button>
                            <div>
                                <ReactStars {...options} />
                                <div>({product.numberOfReviews} Reviews)</div>
                            </div>
                            <button>Submit Review</button>
                        </div>
                    </>
                }
            </div>
            <div className={styles['reviews-container']}>
                <h2>Product Reviews</h2>
                {
                    !loading && product && product.reviews && product.reviews.length > 0 &&
                    product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)
                }
                {
                    !loading && product && product.reviews && product.reviews.length === 0 && <NoReview text={"No Reviews"} />
                }
            </div>
        </>
    );
}

export default ProductDetails;