import {
    LOGIN_SIGNUP_FAIL,
    LOGIN_SIGNUP_REQUEST,
    LOGIN_SIGNUP_SUCCESS,
    CLEAR_ERROR
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_SIGNUP_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SIGNUP_SUCCESS:
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
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return { ...state };
    }
}