import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL
} from '../constants/orderConstants';
import { BACKEND_HOSTNAME } from '../constants/global';
import axios from 'axios';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const createOrder = (orderDetails) => async (dispatch) => {
    try{
        dispatch({
            type: CREATE_ORDER_REQUEST
        });
    
        const { data } = await axios.post(BACKEND_HOSTNAME+'/api/v1/order/new', {
            orderDetails,
            config
        });
        

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: {
                order: data
            }
        });
    }catch(err){
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: {
                err: err.response.data.message
            }
        })
    }
}

export const getMyOrders = () => async (dispatch) => {
    try{
        dispatch({
            type: MY_ORDER_REQUEST
        });

        const { data } = await axios.get(BACKEND_HOSTNAME+'/api/v1/orders/me');

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: {
                orders: data.orders
            }
        });
    }catch(err){
        dispatch({
            type: MY_ORDER_FAIL,
            payload: {
                error: err.response.data.message
            }
        })
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}