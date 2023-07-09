import React, { useState } from 'react';
import { STRIPE_API_KEY } from '../../constants/global';
import { loadStripe } from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import styles from './Payment.module.css';
import StepperCmp from './StepperCmp';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createOrder } from '../../actions/orderAction';
import { removeFromCart } from '../../actions/cartAction';
const amount = (sessionStorage.getItem('shippingInfo')) ? JSON.parse(sessionStorage.getItem('shippingInfo')).total : 10;

const CheckoutForm = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.order);
    const { cartItems, shippingInfo } = useSelector(state => state.cart);

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            return;
        }

        const shippingInformation = {
            ...shippingInfo,
            phoneNumber: shippingInfo.phoneNo
        }

        let itemPrice = 0;
        let taxPrice = 0;
        let shippingPrice = 0;
        let totalPrice = 0;

        const orderItems = cartItems.map(item => {
            itemPrice += item.price * item.quantity;
            return {
                ...item,
                product: item.productID
            }
        })

        taxPrice = 0.18 * itemPrice;
        shippingPrice = (itemPrice > 2000) ? 0 : 200;
        totalPrice = itemPrice + taxPrice + shippingPrice;

        const paymentInfo = {
            "id": 'id',
            "status": "success"
        };

        const data = {
            shippingInfo: shippingInformation,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        };

        dispatch(createOrder(data));

        cartItems.forEach(item => {
            dispatch(removeFromCart(item.productID));
        })

        alert.success('Payment successful');
        navigate('/orders');
    };

    if (errorMessage) {
        alert.show(errorMessage);
    }

    if (error) {
        alert.show('Something went wrong, please try again.');
        navigate('/account');
        dispatch(clearErrors());
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    );
};

const stripePromise = loadStripe(STRIPE_API_KEY);

const options = {
    mode: 'payment',
    amount: amount,
    currency: 'inr'
};

const Payment = () => (
    <>
        <StepperCmp activeIndex={2} />
        <div className={styles['payment-container']}>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </div>
    </>
);

export default Payment;