import {tasksApi, TasksType} from "../../common/api/api";
import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";

const initialState: TasksType[] = []

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                action.payload.tasks.forEach(ts => state.push(ts))
            })
    }
})

//thunk
export const getTasks = createAppAsyncThunk<{ tasks: TasksType[] }, { todolistId: string }>
('tasks/getTasks', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const res = await tasksApi.getTasks(arg.todolistId)
        return { tasks: res.data.items }

    } catch (error) {
        return rejectWithValue(null)
    }
})


export const tasksReducer = slice.reducer
export const tasksThunk = { getTasks }