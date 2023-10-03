import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/thunks/create-app-async-thunk";
import {tasksThunk} from "../Tasks/tasks.slice";
import {todolistsApi} from "./todolists.api";
import {TodolistsType} from "./todolists.types";

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
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((td) => td.id === action.payload.todolistId)
                if (index !== -1) state.splice(index, 1)
            })
    }
})

//thunk
export const getTodolists = createAppAsyncThunk<{ todolists: TodolistsType[] }>
('todolists/getTodolists', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        const res = await todolistsApi.getTodolists()
        res.data.forEach(tl => dispatch(tasksThunk.fetchTasks({todolistId: tl.id})))
        return {todolists: res.data}
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const removeTodolist = createAppAsyncThunk<{ todolistId: string },
    string>
('todolists/removeTodolist', async (todolistId, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const res = await todolistsApi.removeTodolist(todolistId)
        if (res.data.resultCode === 0) {
            return {todolistId}
        } else {
            return rejectWithValue(null)
        }
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const todolistsSlice = slice.reducer
export const todolistsThunk = {getTodolists, removeTodolist}