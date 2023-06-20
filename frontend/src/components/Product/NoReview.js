import styles from './NoReview.module.css';
import { FaSadTear } from 'react-icons/fa';

const NoReview = () => {
    return (
        <div className={styles['no-reviews']}>
            <div>No Reviews</div>
            <FaSadTear />
        </div>
    )
}

export default NoReview;