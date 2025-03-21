// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import sortReducer from './sortSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sort: sortReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
