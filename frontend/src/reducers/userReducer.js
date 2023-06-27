import {
    LOGIN_SIGNUP_FAIL,
    LOGIN_SIGNUP_REQUEST,
    LOGIN_SIGNUP_SUCCESS,
    CLEAR_ERROR,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_SIGNUP_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SIGNUP_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        case LOGIN_SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.err,
                user: null,
                isAuthenticated: false
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                error: action.payload.err,
                user: null,
                isAuthenticated: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return { ...state };
    }
}