import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({

})

export const store = configureStore({
    reducer: rootReducer
})

// This lets me look at the project's state
// @ts-ignore
window.store = store;

