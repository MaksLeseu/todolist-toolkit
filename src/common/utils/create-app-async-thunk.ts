import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppRootStateType} from "../../app/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType,
    dispatch: any,
    rejectValue: null,
}>()