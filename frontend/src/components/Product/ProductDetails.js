import styles from './ProductDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetails } from '../../actions/productActions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Loader from '../layout/Loader/Loader';
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
    const [count, setCount] = useState(0);
    const params = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);

    const options = {
        edit: true,
        value: product.rating,
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

    useEffect(() => {
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id]);

    const productName = (product.name) ? product.name.toUpperCase() : "";
    
    return (
        <div className={styles['container']}>
            {loading ? <Loader /> :
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
                        <div>Description: {product.description}</div>
                        <div>Stock:
                            <span className={product.stock < 1 ? styles['danger'] : styles['success']}>
                                <strong>{product.stock < 1 ? " Out of stock " : " In stock "}</strong>
                            </span>
                            <small>({product.stock} {product.stock > 1 ? " items remaining" : " item remaining"})</small>
                        </div>
                        <div>
                            <button onClick={subOne}>-</button>
                            <input type="number" value={count} min={0}></input>
                            <button onClick={addOne}>+</button>
                        </div>
                        <div>
                            <ReactStars {...options} />
                            <div>({product.numberOfReviews} Reviews)</div>
                        </div>
                        <button>Submit Review</button>
                    </div>
                </>
            }
        </div>
    );
}

export default ProductDetails;