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
const amount = JSON.parse(sessionStorage.getItem('shippingInfo')).total;

const CheckoutForm = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();

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
        alert.success('Payment successful');
        navigate('/orders');
    };

    if(errorMessage){
        alert.show(errorMessage);
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