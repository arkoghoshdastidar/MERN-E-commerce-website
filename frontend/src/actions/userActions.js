import axios from 'axios';
import {
    LOGIN_SIGNUP_FAIL,
    LOGIN_SIGNUP_REQUEST,
    LOGIN_SIGNUP_SUCCESS,
    CLEAR_ERROR,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST
} from '../constants/userConstants';
import { BACKEND_HOSTNAME } from '../constants/global';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

axios.defaults.withCredentials = true;

// login user
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_SIGNUP_REQUEST
        });

        const { data } = await axios.post(BACKEND_HOSTNAME + '/api/v1/login', {
            email,
            password
        }, config
        );

        localStorage.setItem('user', {
            loading: false,
            user: data,
            isAuthenticated: true
        });

        dispatch({
            type: LOGIN_SIGNUP_SUCCESS, payload: {
                user: data
            }
        });
    } catch (err) {
        dispatch({
            type: LOGIN_SIGNUP_FAIL, payload: {
                err: err.response.data.error
            }
        });
    }
}

// signup user
export const signup = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_SIGNUP_REQUEST
        });

        const { data } = await axios.post(BACKEND_HOSTNAME + '/api/v1/register', {
            name,
            email,
            password,
        }, config
        );

        dispatch({
            type: LOGIN_SIGNUP_SUCCESS, payload: {
                user: data
            }
        })
    } catch (err) {
        dispatch({
            type: LOGIN_SIGNUP_FAIL, payload: {
                err: err.response.data.error
            }
        })
    }
}

// load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        });

        const { data } = await axios.get(BACKEND_HOSTNAME + '/api/v1/me');

        dispatch({
            type: LOAD_USER_SUCCESS, payload: {
                user: data
            }
        })
    } catch (err) {
        dispatch({
            type: LOAD_USER_FAIL, payload: {
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