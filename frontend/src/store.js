import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { allProductsReducer, productDetailsReducer } from './reducers/productReducer';
import { userReducer, profileReducer } from './reducers/userReducer';
import { cartReducer } from "./reducers/cartReducer";
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
    cart: {
        cartItems: (localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [],
    }
};

const reducers = combineReducers({
    products: allProductsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer
});

export const store = createStore(reducers, initialState,composeWithDevTools(applyMiddleware(thunk)));

export default store;