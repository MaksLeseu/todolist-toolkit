import {tasksApi, TasksType} from "../../common/api/api";
import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";

const initialState: StateTaskType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const tasks: any = state[action.payload.todolistId]
                tasks.unshift(action.payload.task)
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks: any = state[action.payload.todolistId]
                const index = tasks.findIndex((ts: any) => ts.id === action.payload.taskId)
                if (index !== -1) tasks.splice(index, 1)
            })
    }
})

//thunk
export const getTasks = createAppAsyncThunk<
    { tasks: TasksType, todolistId: string },
    { todolistId: string }>
('tasks/getTasks', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const res = await tasksApi.getTasks(arg.todolistId)
        return { tasks: res.data.items, todolistId: arg.todolistId }

    } catch (error) {
        return rejectWithValue(null)
    }
})

export const addTask = createAppAsyncThunk<
    { todolistId: string, task: TasksType },
    { todolistId: string, title: string }>
('tasks/addTask', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const res = await tasksApi.createTask({todolistId: arg.todolistId, title: arg.title})
        return {todolistId: arg.todolistId, task: res.data.data.item}
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const removeTask = createAppAsyncThunk<
    any,
    { todolistId: string, taskId: string }>
('tasks,removeTask', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const res = await tasksApi.removeTask(arg.todolistId, arg.taskId)
        console.log(res)
        return { todolistId: arg.todolistId, taskId: arg.taskId }
    } catch (error) {
        return rejectWithValue(null)
    }
})

type StateTaskType = {
    [key: string]: TasksType
}


export const tasksReducer = slice.reducer
export const tasksThunk = { getTasks, addTask, removeTask }