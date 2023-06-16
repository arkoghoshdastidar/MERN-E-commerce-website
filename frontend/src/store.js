import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import productReducer from './reducers/productReducer';
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
    product: productReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;