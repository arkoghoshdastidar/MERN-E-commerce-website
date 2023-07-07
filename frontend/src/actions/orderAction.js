import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL
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
        console.log(err);
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: {
                err: err.response.data.message
            }
        })
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}