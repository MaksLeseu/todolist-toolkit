import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Nullable} from "../common/utils/types/optional.types";

const slice = createSlice({
    name: 'app',
    initialState: {
        error: null as Nullable<string>,
        isOpenMenu: false as boolean,
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: Nullable<string> }>) => {
            state.error = action.payload.error;
        },
        setIsOpenMenu: (state, action: PayloadAction<{ isOpenMenu: boolean }>) => {
            state.isOpenMenu = action.payload.isOpenMenu;
        }
    }
})

export const appSlice = slice.reducer
export const appActions = slice.actions