import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/thunks/create-app-async-thunk";
import {authApi} from "./auth.api";
import {LoginDataType} from "./auth.types";

const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authMe.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

//thunk
export const authMe = createAppAsyncThunk<{ isLoggedIn: boolean },
    {}>
('auth/authMe', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const res = await authApi.me()
        return res.data.resultCode === 0 ? {isLoggedIn: true} : {isLoggedIn: false}
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const login = createAppAsyncThunk<void,
    { data: LoginDataType }>
('auth/login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await authApi.login(arg.data)
        if (res.data.resultCode === 0) dispatch(authThunk.authMe({}))
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const logout = createAppAsyncThunk<void,
    {}>
('auth/logout', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await authApi.logout()
        if (res.data.resultCode === 0) dispatch(authThunk.authMe({}))
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const authSlice = slice.reducer
export const authThunk = {authMe, login, logout}
