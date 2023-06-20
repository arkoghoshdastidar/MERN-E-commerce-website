import styles from './ReviewCard.module.css';
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        value: review.rating,
        isHalf: true,
        size: 16
    }

    return (
        <div className={styles['review-card']}>
            <div>
                {review.name} <ReactStars {...options} />
            </div>
            <small>{review.comment}</small>
        </div>
    )
}

export default ReviewCard;