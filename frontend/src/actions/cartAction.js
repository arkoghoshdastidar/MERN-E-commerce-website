import { ADD_TO_CART } from '../constants/cartConstants';
import { BACKEND_HOSTNAME } from '../constants/global';
import axios from 'axios';

export const addItemToCart = (productID, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(BACKEND_HOSTNAME + `/api/v1/product/${productID}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            productID,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image[0].url,
            stock: data.product.stock,
            quantity
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState.cart.cartItems));
}