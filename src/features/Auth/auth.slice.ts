import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/thunks/create-app-async-thunk";
import {authApi} from "./auth.api";
import {LoginDataType} from "./auth.types";
import {todolistsActions, todolistsThunk} from "../Todolists/todolists.slice";
import {ResultCode} from "../../common/utils/enums";
import {handleServerAppError} from "../../common/utils/functions/handleServerAppError/handleServerAppError";
import {handleServerNetworkError} from "../../common/utils/functions/handleServerNetworkError/handleServerNetworkError";
import {thunkTryCatch} from "../../common/utils/functions/thunkTryCatch/thunkTryCatch";
import {appActions} from "../../app/app.slice";

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
    const {rejectWithValue, dispatch} = thunkAPI
    try {
        dispatch(appActions.setIsInitialized({isInitialized: true}))
        const res = await authApi.me()
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(todolistsThunk.fetchTodolists())
                .finally(() => dispatch(appActions.setIsInitialized({isInitialized: false})))
            return {isLoggedIn: true}
        } else {
            dispatch(appActions.setIsInitialized({isInitialized: false}))
            return {isLoggedIn: false}
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        dispatch(appActions.setIsInitialized({isInitialized: false}))
        return rejectWithValue(null)
    }
})

export const login = createAppAsyncThunk<void,
    { data: LoginDataType }>
('auth/login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
        const res = await authApi.login(arg.data)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(authThunk.authMe({}))
        } else {
            const isShowAppError = !res.data.fieldsErrors.length;
            handleServerAppError(res.data, dispatch, isShowAppError)
            return rejectWithValue(res.data);
        }
    })
})

export const logout = createAppAsyncThunk<void,
    {}>
('auth/logout', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
        const res = await authApi.logout()
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(todolistsActions.clearTodos())
            dispatch(authThunk.authMe({}))
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(res.data);
        }
    })
})

export const authSlice = slice.reducer
export const authThunk = {authMe, login, logout}
