import styles from './Home.module.css';
import { Link } from 'react-router-dom'; 
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
    const options = {
        edit: false,
        value: product.rating,
        isHalf: true,
        activeColor: 'tomato'
    }

    return (
        <Link className={styles['product-card']} to={product._id}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span>({product.reviews.length} Reviews)</span>
            </div>
            <span>₹ {product.price}</span>
        </Link>
    )
}

export default Product;