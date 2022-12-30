import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import accountReducer from './slices/accountSlide';

export const store = configureStore({
    reducer: { order: orderReducer, account: accountReducer },
});
