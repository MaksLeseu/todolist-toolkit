import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Nullable} from "../common/utils/types/optional.types";

const slice = createSlice({
    name: 'app',
    initialState: {
        error: null as Nullable<string>
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: Nullable<string> }>) => {
            state.error = action.payload.error;
        },
    }
})

export const appSlice = slice.reducer
export const appActions = slice.actions