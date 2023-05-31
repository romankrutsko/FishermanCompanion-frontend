import { createSlice } from "@reduxjs/toolkit"
import jwt_decode from 'jwt-decode';

const data = JSON.parse(localStorage.getItem('fishing'));
const token = data && data.token ? data.token : null;
const decodedToken = token ? jwt_decode(token) : null;
const isTokenValid = decodedToken ? Date.now() < decodedToken.exp * 1000 : false;
const user = isTokenValid ? data.user : null;

const initialState =
{
    isAuth: isTokenValid,
    user
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.isAuth = true
            state.user = action.payload.user
            localStorage.setItem('fishing', JSON.stringify(action.payload))
        },
        logOut(state) {
            state.isAuth = false
            localStorage.removeItem('fishing')
        },
        updateCredentials(state, action) {
            state.user = action.payload
            const data = { token: JSON.parse(localStorage.getItem('fishing')).token, user: action.payload }
            localStorage.setItem('fishing', JSON.stringify(data))
        }
    }
})

export const { setCredentials, logOut, updateCredentials } = authSlice.actions
export default authSlice.reducer

export const selectCurrentAuthState = state => state.auth?.isAuth
export const selectCurrentUserID = state => state.auth?.user?.id
export const selectCurrentUserRole = state => state.auth?.user?.role
export const selectCurrentUserLocation = state => state.auth?.user?.location