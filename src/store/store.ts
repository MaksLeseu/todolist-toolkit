import {configureStore} from "@reduxjs/toolkit";
import {todolistsSlice} from "../features/Todolists/todolists.slice";
import {tasksSlice} from "../features/Tasks/tasks.slice";
import {authSlice} from "../features/Auth/auth.slice";
import {appSlice} from "../app/app.slice";

export const store = configureStore({
    reducer: {
        todolists: todolistsSlice,
        tasks: tasksSlice,
        auth: authSlice,
        app: appSlice
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


// This lets me look at the project's state
// @ts-ignore
window.store = store;

