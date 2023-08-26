import {createSlice} from "@reduxjs/toolkit";
import {todolistsApi, TodolistsType} from "../../common/api/api";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";

const initialState: TodolistsType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => state.push(tl))
            })
    }
})

//thunk
export const getTodolists = createAppAsyncThunk<{ todolists: TodolistsType[] }>
('todolists/getTodolists', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const res = await todolistsApi.getTodolists()
        return { todolists: res.data }
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const todolistsReducer = slice.reducer
export const todolistsThunk = { getTodolists }