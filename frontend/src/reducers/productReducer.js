import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERRORS
} from '../constants/productConstants';

const INITIAL_STATE = {
    products: []
};

const productReducer = (state = INITIAL_STATE, action) => {
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
                productCount: action.payload.productCount
            }
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload.err
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

export default productReducer;