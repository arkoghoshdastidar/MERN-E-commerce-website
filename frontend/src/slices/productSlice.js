import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products: [],
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProduct: async (state, action) => {
            
        }
    },
});

export const { getProduct } = productSlice.actions;

export default productSlice.reducer;