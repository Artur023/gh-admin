import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    owner: string
    token: string
}

const initialState: AuthState = {
    owner: localStorage.getItem('owner') || '',
    token: localStorage.getItem('token') || '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthState>) {
            state.owner = action.payload.owner
            state.token = action.payload.token
            localStorage.setItem('owner', action.payload.owner)
            localStorage.setItem('token', action.payload.token)
        },
        logout(state) {
            state.owner = ''
            state.token = ''
            localStorage.removeItem('owner')
            localStorage.removeItem('token')
        },
    },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer
