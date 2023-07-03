import {
    ADD_TO_CART,
    REMOVE_FROM_CART
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const newItemID = action.payload.productID;
            const itemAlreadyPresent = state.cartItems.find(item => item.productID === newItemID);
            if (itemAlreadyPresent) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => {
                        if (item.productID === newItemID) {
                            return action.payload;
                        }
                        return item;
                    })
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                }
            }
        case REMOVE_FROM_CART:
            const productID = action.payload.productID;
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.productID !== productID)
            }
        default:
            return state;
    }
}