import {createSlice} from "@reduxjs/toolkit";
import {Nullable} from "../common/utils/types/optional.types";

const slice = createSlice({
    name: 'app',
    initialState: {
        error: null as Nullable<string>
    },
    reducers: {},
    extraReducers: (builder) => {

    }
})

export const appSlice = slice.reducer