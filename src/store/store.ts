import {configureStore} from "@reduxjs/toolkit";
import {todolistsSlice} from "../features/Todolists/todolists.slice";
import {tasksSlice} from "../features/Tasks/tasks.slice";
import {authSlice} from "../features/Auth/auth.slice";

export const store = configureStore({
    reducer: {
        todolists: todolistsSlice,
        tasks: tasksSlice,
        auth: authSlice
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = typeof store.dispatch


// This lets me look at the project's state
// @ts-ignore
window.store = store;

