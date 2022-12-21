import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customer: {
        name: '',
        phone: '',
        address: '',
    },
    details: [],
    totalPrice: 0,
};

function updateTotalPrice(state) {
    state.totalPrice = state.details.reduce((prevPrice, currDetail) => {
        return prevPrice + currDetail.quantity * currDetail.price;
    }, 0);
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            // UPDATE PRODUCT
            const indexDetail = state.details.findIndex((detail) => detail.product === action.payload.product);
            if (indexDetail !== -1) {
                state.details[indexDetail].quantity += action.payload.quantity;
            } else {
                state.details.push(action.payload);
            }
            updateTotalPrice(state);
        },

        // action: product
        remove: (state, action) => {
            state.details = state.details.filter((detail) => detail.product !== action.payload);
            updateTotalPrice(state);
        },

        // action: {product, quantity}
        updateQuantity: (state, action) => {
            const indexDetail = state.details.findIndex((detail) => detail.product === action.payload.product);
            if (indexDetail !== -1) {
                state.details[indexDetail].quantity = action.payload.quantity;
            }
            updateTotalPrice(state);
        },

        updateCustomer: (state, action) => {
            state.customer = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;

export default cartReducer;
export { cartActions };
