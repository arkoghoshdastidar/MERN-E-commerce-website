import axios from 'axios';
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CLEAR_ERROR
} from '../constants/userConstants';
import { BACKEND_HOSTNAME } from '../constants/global';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

// login user
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        const { data } = await axios.post(BACKEND_HOSTNAME + '/api/v1/login', {
            email,
            password
        }, config
        );

        dispatch({
            type: LOGIN_SUCCESS, payload: {
                user: data
            }
        })
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL, payload: {
                err: err.response.data.error
            }
        })
    }
}

// signup user
export const signup = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        const { data } = await axios.post(BACKEND_HOSTNAME + '/api/v1/register', {
            name,
            email,
            password,
        }, config
        );

        dispatch({
            type: LOGIN_SUCCESS, payload: {
                user: data
            }
        })
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL, payload: {
                err: err.response.data.error
            }
        })
    }
}

// clear error
export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}