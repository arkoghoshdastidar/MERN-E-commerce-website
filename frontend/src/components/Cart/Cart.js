import styles from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import NoItem from '../Product/NoReview';

const Cart = () => {
    const items = useSelector(state => state.cart.cartItems);

    let totalPrice = 0;

    for (let i = 0; i < items.length; i++) {
        totalPrice += items[i].price * items[i].quantity;
    }

    if (!items || items.length === 0) {
        return <NoItem text={"No item in cart"} />
    }

    return (
        <>
            <div className={styles['cart-container']}>
                <div className={`${styles['d-grid']} ${styles['primary-background']}`}>
                    <div>Product</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                </div>
                {
                    items.map(item => <CartItem key={item.productID} item={item} />)
                }
            </div>
            <div className={styles['order-container']}>
                <div className={styles['total-price']}>₹{totalPrice}</div>
                <button className={styles['order-button']}>Order Now</button>
            </div>
        </>
    )
}

export default Cart;