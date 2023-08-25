import {AnyAction, combineReducers} from "redux";
import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer
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

