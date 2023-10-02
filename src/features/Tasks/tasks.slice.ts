import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/constans/create-app-async-thunk";
import {tasksApi, TasksType} from "./tasks.api";

const initialState: StateTaskType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.todolistId].unshift(action.payload.task)
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks: any = state[action.payload.todolistId]
                const index = tasks.findIndex((ts: any) => ts.id === action.payload.taskId)
                if (index !== -1) tasks.splice(index, 1)
            })
    }
})

//thunk
export const fetchTasks = createAppAsyncThunk<{ tasks: TasksType[], todolistId: string },
    { todolistId: string }>
('tasks/getTasks', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const res = await tasksApi.fetchTasks(arg.todolistId)
        return {tasks: res.data.items, todolistId: arg.todolistId}

    } catch (error) {
        return rejectWithValue(null)
    }
})

export const addTask = createAppAsyncThunk<{ todolistId: string, task: TasksType },
    { todolistId: string, title: string, description: string }>
('tasks/addTask', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const res = await tasksApi.createTask({
            todolistId: arg.todolistId,
            title: arg.title,
            description: arg.description
        })

        return {todolistId: arg.todolistId, task: res.data.data.item}
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const removeTask = createAppAsyncThunk<any,
    { todolistId: string, taskId: string }>
('tasks/removeTask', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        await tasksApi.removeTask(arg.todolistId, arg.taskId)
        return {todolistId: arg.todolistId, taskId: arg.taskId}
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const changeTask = createAppAsyncThunk<{ todolistId: string, taskId: string, description: string },
    { todolistId: string, taskId: string, description: string }>
('tasks/addDescription', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const res = await tasksApi.changeTask({
            todolistId: arg.todolistId,
            taskId: arg.taskId,
            description: arg.description
        })
        return {
            todolistId: arg.todolistId, taskId: arg.taskId, description: arg.description
        }
    } catch (error) {
        return rejectWithValue(null)
    }
})

export type StateTaskType = {
    [key: string]: TasksType[]
}


export const tasksSlice = slice.reducer
export const tasksThunk = {fetchTasks, addTask, removeTask}