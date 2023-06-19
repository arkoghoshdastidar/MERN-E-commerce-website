import axios from 'axios';
import { BACKEND_HOSTNAME } from '../constants/global.js';

import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

// action to get all products from database
export const getProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ALL_PRODUCTS_REQUEST
            });

            const { data } = await axios.get(BACKEND_HOSTNAME + '/api/v1/products');

            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: {
                    products: data.products,
                    productCount: data.productCount
                }
            });
        } catch (err) {
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload: {
                    err: err.message
                }
            });
        }
    }
}
  
// get the product details of a product
export const getProductDetails = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: PRODUCT_DETAILS_REQUEST
            });

            const { data } = await axios.get(`${BACKEND_HOSTNAME}/api/v1/product/${id}`);

            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: {
                    productDetails: data.product
                }
            })

        } catch (err) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: {
                    err: err.message
                }
            });
        }
    }
}

// clear all the errors
export const clearError = () => {
    return {
        type: CLEAR_ERRORS
    };
}