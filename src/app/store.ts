import {AnyAction, combineReducers} from "redux";
import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {todolistsSlice} from "../features/TodolistsList/todolists-slice";
import {tasksSlice} from "../features/TodolistsList/tasks-slice";

const rootReducer = combineReducers({
    todolists: todolistsSlice,
    tasks: tasksSlice
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppRootStateType = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


// This lets me look at the project's state
// @ts-ignore
window.store = store;

