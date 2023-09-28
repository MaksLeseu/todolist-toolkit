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
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTaskName.fulfilled, (state, action) => {
                const tasks: any = state[action.payload.todolistId]
                tasks.unshift(action.payload.task)
            })
            .addCase(addDescription.fulfilled, (state, action) => {
                const task = state[action.payload.todolistId].filter(ts => ts.id === action.payload.taskId)
                task.map(ts => ts.description = action.payload.description)
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
        const res = await tasksApi.getTasks(arg.todolistId)
        return {tasks: res.data.items, todolistId: arg.todolistId}

    } catch (error) {
        return rejectWithValue(null)
    }
})

export const addTaskName = createAppAsyncThunk<{ todolistId: string, task: TasksType },
    { todolistId: string, title: string, description: string }>
('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        const res = await tasksApi.createTask({todolistId: arg.todolistId, title: arg.title})

        if (res) {
            dispatch(tasksThunk.addDescription({
                todolistId: arg.todolistId,
                taskId: res.data.data.item.id,
                description: arg.description
            }))
        }

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

export const addDescription = createAppAsyncThunk<{ todolistId: string, taskId: string, description: string },
    { todolistId: string, taskId: string, description: string }>
('tasks/addDescription', async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const res = await tasksApi.addDescription({
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
export const tasksThunk = {fetchTasks, addTaskName, removeTask, addDescription}