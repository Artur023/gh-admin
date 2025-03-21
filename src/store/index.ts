import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import sortReducer from './sortSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sort: sortReducer,
    },
});

export type { AuthState } from './authSlice';
export type { SortState } from './sortSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
