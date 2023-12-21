import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../common/utils/thunks/create-app-async-thunk";
import {tasksApi} from "./tasks.api";
import {TasksType, UpdateTaskArgType, UpdateTaskModelType} from "./tasks.types";
import {todolistsActions} from "../Todolists/todolists.slice";
import {ResultCode} from "../../common/utils/enums";
import {Dayjs} from "dayjs";

const slice = createSlice({
    name: 'tasks',
    initialState: {} as StateTaskType,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                if (tasks) tasks.unshift(action.payload.task)
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks: any = state[action.payload.todolistId]
                const index = tasks.findIndex((ts: any) => ts.id === action.payload.taskId)
                if (index !== -1) tasks.splice(index, 1)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state[action.payload.todolistId].map(ts => ts.id === action.payload.taskId)
            })
            .addCase(todolistsActions.clearTodos, () => {
                return {}
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
    { todolistId: string, title: string, description: string, startDate: Dayjs | null, deadline: Dayjs | null, priority: number }>
('tasks/addTask', async (arg, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI

    try {
        const res = await tasksApi.createTask({
            todolistId: arg.todolistId,
            title: arg.title,
            description: arg.description,
            startDate: arg.startDate,
            deadline: arg.deadline,
            priority: arg.priority
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

export const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>
('tasks/addDescription', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI

    const state = getState()
    const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);

    if (!task) return rejectWithValue(null);

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline as any,
        description: task.description,
        startDate: task.startDate as any,
        title: task.title,
        status: task.status,
        priority: task.priority,
        ...arg.domainModel,
    };

    try {
        const res = await tasksApi.updateTask(
            arg.todolistId,
            arg.taskId,
            apiModel
        )

        if (res.data.resultCode === ResultCode.Success) dispatch(fetchTasks({todolistId: arg.todolistId}))

        return arg
    } catch (error) {
        return rejectWithValue(null)
    }
})

export type StateTaskType = {
    [key: string]: TasksType[]
}


export const tasksSlice = slice.reducer
export const tasksThunk = {fetchTasks, addTask, removeTask, updateTask}