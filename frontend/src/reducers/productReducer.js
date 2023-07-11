import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ADD_REVIEW_FAIL,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    CLEAR_ERRORS
} from '../constants/productConstants';

export const allProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage
            }
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload.err,
                products: []
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return { ...state };
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                product: {}
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.productDetails
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload.err,
                product: {}
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return { ...state };
    }
}

export const addReviewReducer = (state = {}, action) => {
    switch (action.type){
        case ADD_REVIEW_REQUEST:
            return {
                reviewLoading: true
            }
        case ADD_REVIEW_SUCCESS:
            return {
                ...state,
                reviewLoading: false,
                data: action.payload.data
            }
        case ADD_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload.err,
                reviewLoading: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                reviewLoading: false,
                error: null
            }
        default:
            return state;
    }
}