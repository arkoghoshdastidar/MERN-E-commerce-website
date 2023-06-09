import axios from 'axios';
import { BACKEND_HOSTNAME } from '../constants/global.js';

import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
    ADD_REVIEW_FAIL,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS
} from '../constants/productConstants';

// action to get all products from database
export const getProducts = (keyword="", pageNo=1, price=[0, 10000], category=null, rating=0) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ALL_PRODUCTS_REQUEST
            });

            let link = BACKEND_HOSTNAME + `/api/v1/products?page=${pageNo}&keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;

            if(category) {
                link += `&category=${category}`;
            }

            const { data } = await axios.get(link);

            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: {
                    products: data.products,
                    productCount: data.productCount,
                    resultPerPage: data.resultPerPage
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

// get all products admin
export const getAllAdminProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ADMIN_PRODUCTS_REQUEST
            });

            const { data } = await axios.get(BACKEND_HOSTNAME+'/api/v1/products/admin');
            
            dispatch({
                type: ADMIN_PRODUCTS_SUCCESS,
                payload: {
                    products: data.products
                }
            });
        } catch (err) {
            dispatch({
                type: ADMIN_PRODUCTS_FAIL,
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

// submit review
export const addNewReivew = ( {comment, rating, productId} ) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: ADD_REVIEW_REQUEST
            });

            const { data } = await axios.put(BACKEND_HOSTNAME + '/api/v1/review', {
                comment,
                rating,
                productId
            });

            dispatch({
                type: ADD_REVIEW_SUCCESS,
                payload: {
                    data
                }
            })

        }catch(err){
            dispatch({
                type: ADD_REVIEW_FAIL,
                payload: {
                    err: 'Failed to add review'
                }
            })
        }
    }
}

// clear all the errors
export const clearError = () => {
    return {
        type: CLEAR_ERRORS
    };
}