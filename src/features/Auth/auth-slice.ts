import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {authApi, LoginDataType} from "../../common/api/api";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authMe.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
                console.log(state.isLoggedIn)
            })
    }
})

//thunk
export const authMe = createAppAsyncThunk<
    any,
    any>
('auth/authMe', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await authApi.me()
        return  res.data.resultCode === 0 ? {isLoggedIn: true} : {}
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const login = createAppAsyncThunk<
    void,
    { data: LoginDataType }>
('auth/login', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        await authApi.login(arg.data)
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const logout = createAppAsyncThunk<
    void,
    {}>
('auth/logout', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        await authApi.logout()
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const authSlice = slice.reducer
export const authThunk = { authMe, login, logout }
