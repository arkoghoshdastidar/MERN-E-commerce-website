import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { allProductsReducer, productDetailsReducer } from './reducers/productReducer';
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
    products: allProductsReducer,
    productDetails: productDetailsReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;