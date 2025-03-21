export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    auth: import("./authSlice").AuthState;
    sort: import("./sortSlice").SortState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        auth: import("./authSlice").AuthState;
        sort: import("./sortSlice").SortState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type { AuthState } from './authSlice';
export type { SortState } from './sortSlice';
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
