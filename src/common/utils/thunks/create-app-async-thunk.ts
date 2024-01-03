import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppRootStateType} from "../../../store/store";
import {BaseResponseType} from "../types/common.types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType,
    dispatch: AppDispatch,
    rejectValue: null | BaseResponseType,
}>()