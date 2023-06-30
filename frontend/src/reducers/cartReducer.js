import { ADD_TO_CART } from '../constants/cartConstants';

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
        default:
            return state;
    }
}