import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {todolistsApi, TodolistsType} from "../../common/api/api";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";

const initialState: TodolistsType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {}
})

//thunk
export const getTodolists = createAppAsyncThunk<
    any,
    TodolistsType[]>
('todolists/getTodolists', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
        const res = await todolistsApi.getTodolists()
        console.log(res.data)
    } catch (error) {
        return rejectWithValue(null)
    }
})