import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { allProductsReducer, productDetailsReducer, addReviewReducer } from './reducers/productReducer';
import { userReducer, profileReducer } from './reducers/userReducer';
import { cartReducer } from "./reducers/cartReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { orderReducer, myOrderReducer, orderDetailsReducer } from './reducers/orderReducer';

const initialState = {
    cart: {
        cartItems: (localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: (localStorage.getItem('shippingInfo')) ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
};

const reducers = combineReducers({
    products: allProductsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    order: orderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: addReviewReducer
});

export const store = createStore(reducers, initialState,composeWithDevTools(applyMiddleware(thunk)));

export default store;