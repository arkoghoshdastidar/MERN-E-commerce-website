import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { allProductsReducer, productDetailsReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
    products: allProductsReducer,
    productDetails: productDetailsReducer,
    user: userReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;