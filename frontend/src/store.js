import { configureStore } from "@reduxjs/toolkit";
import productSlice from './slices/productSlice';

const store = configureStore({
    reducer: {
        productSlice : productSlice
    },
});

export default store;