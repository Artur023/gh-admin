import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import sortReducer from './sortSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        sort: sortReducer,
    },
});
