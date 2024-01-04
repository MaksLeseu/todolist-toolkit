import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Nullable} from "../common/utils/types/optional.types";

type InitialStateType = {
    error: Nullable<string>,
    isOpenMenu: boolean,
    isInitialized: boolean
}

const slice = createSlice({
    name: 'app',
    initialState: {
        error: null,
        isOpenMenu: false,
        isInitialized: false,
    } as InitialStateType,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: Nullable<string> }>) => {
            state.error = action.payload.error;
        },
        setIsOpenMenu: (state, action: PayloadAction<{ isOpenMenu: boolean }>) => {
            state.isOpenMenu = action.payload.isOpenMenu;
        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appSlice = slice.reducer
export const appActions = slice.actions