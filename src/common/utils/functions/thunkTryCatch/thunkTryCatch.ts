import {handleServerNetworkError} from "../handleServerNetworkError/handleServerNetworkError";
import {AppDispatch, AppRootStateType} from "../../../../store/store";
import {BaseResponseType} from "../../types/common.types";
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
    logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const {dispatch, rejectWithValue} = thunkAPI;

    try {
        return await logic()
    } catch (err) {
        handleServerNetworkError(err, dispatch);
        return rejectWithValue(null);
    }
}