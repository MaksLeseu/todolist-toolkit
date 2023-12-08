import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/thunks/create-app-async-thunk";
import {todolistsApi} from "./todolists.api";
import {TodolistFilterType, TodolistsType} from "./todolists.types";

const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistsType[],
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: TodolistFilterType }>) => {
            const todo = state.find(tl => tl.id === action.payload.id)
            if (todo) todo.filter = action.payload.filter
        },
        clearTodos: () => {
            return []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => state.push({...tl, filter: 'all'}))
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift(action.payload.todolist)
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((td) => td.id === action.payload.todolistId)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(updateTodolist.fulfilled, (state, action) => {
                const todo = state.find(td => td.id === action.payload.todolistId)

                if (todo) {
                    todo.title = action.payload.title
                }
            })
    }
})

//thunk
export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistsType[] }>
('todolists/getTodolists', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        const res = await todolistsApi.getTodolists()
        return {todolists: res.data}
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const addTodolist = createAppAsyncThunk<any, { title: string }>
('todolists/addTodolist', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const res = await todolistsApi.addTodolist(arg.title)
        return {todolist: res.data.data.item}
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

export const updateTodolist = createAppAsyncThunk<{ todolistId: string, title: string }, { todolistId: string, title: string }>
('todolists/changeTodolist', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const res = await todolistsApi.changeTodolist(arg.todolistId, arg.title)
        if (res.data.resultCode === 0) {
            return {todolistId: arg.todolistId, title: arg.title}
        } else {
            return rejectWithValue(null)
        }
    } catch (error) {
        return rejectWithValue(null)
    }
})


export const todolistsActions = slice.actions
export const todolistsSlice = slice.reducer
export const todolistsThunk = {fetchTodolists, addTodolist, removeTodolist, updateTodolist}