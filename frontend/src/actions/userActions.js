import axios from 'axios';
import {
    LOGIN_SIGNUP_FAIL,
    LOGIN_SIGNUP_REQUEST,
    LOGIN_SIGNUP_SUCCESS,
    CLEAR_ERROR,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    ALL_USER_REQUEST,
    ALL_USER_FAIL,
    ALL_USER_SUCCESS
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

// logout user
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOGOUT_USER_REQUEST
        });

        await axios.get(BACKEND_HOSTNAME + '/api/v1/logout');

        dispatch({
            type: LOGOUT_USER_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: LOGOUT_USER_FAIL, payload: {
                err: err.response.data.error
            }
        })
    }
}

// edit profile
export const editProfile = (name, email) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST
        });

        const { data } = await axios.put(BACKEND_HOSTNAME + '/api/v1/me/update', {
            name,
            email
        });

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: {
                user: data
            }
        });
    } catch (err) {
        dispatch({
            type: UPDATE_USER_FAIL, payload: {
                err: err.response.data.error
            }
        });
    }
}

// update password
export const updatePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PASSWORD_REQUEST
        });

        const { data } = await axios.put(BACKEND_HOSTNAME + '/api/v1/password/update', {
            oldPassword,
            newPassword,
            confirmPassword
        });

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: {
                user: data
            }
        });
    } catch (err) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: {
                err: err.response.data.error
            }
        });
    }
}

// get all users
export const getAllUsers = () => async (dispatch) => {
    try{
        dispatch({
            type: ALL_USER_REQUEST
        });

        const { data } = await axios.get(BACKEND_HOSTNAME+'/api/v1/admin/users');

        dispatch({
            type: ALL_USER_SUCCESS,
            payload : {
                userDetails: data
            }
        });
    }catch(err){
        console.log(err);
        dispatch({
            type: ALL_USER_FAIL,
            error: err.response.data.error
        });
    }
}

// reseting profile
export const resetProfile = () => {
    return {
        type: UPDATE_USER_RESET
    }
}

// clear error
export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}