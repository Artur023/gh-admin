export interface AuthState {
    owner: string;
    token: string;
}
export declare const setAuth: import("@reduxjs/toolkit").ActionCreatorWithPayload<AuthState, "auth/setAuth">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
