import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL, 
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDER_FAIL,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_REQUEST 
} from '../constants/orderConstants';

export const orderReducer = (state = { orders: {} }, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.order
            }
        case CREATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.err
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const myOrderReducer = (state = {orders: []}, action) => {
    switch (action.type){
        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MY_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders
            }
        case MY_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                orders: [],
                error: action.payload.error
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

export const allOrders = (state = { orders: []}, action) => {
    switch (action.type){
        case ALL_ORDER_REQUEST:
            return {
                oLoading: true
            }
        case ALL_ORDER_SUCCESS:
            return {
                ...state,
                oLoading: false,
                orderDetails: action.payload.orderDetails
            }
        case ALL_ORDER_FAIL:
            return {
                ...state,
                oLoading: false,
                orderDetails: {},
                error: action.payload.error
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default: 
            return state;
    }
}

export const orderDetailsReducer = (state = {orderDetails: {}}, action) => {
    switch (action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                orderDetails: action.payload.orderDetails
            }
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}