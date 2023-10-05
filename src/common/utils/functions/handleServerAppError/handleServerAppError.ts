import {appActions} from "../../../../app/app.slice";
import {Dispatch} from "redux";
import {BaseResponseType} from "../../types/common.types";

export const handleServerAppError = <D>(
    data: BaseResponseType<D>,
    dispatch: Dispatch,
    showError: boolean = true,
): void => {
    console.log(data.messages[0])
    if (showError) {
        dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : "Some error occurred"}));
    }
};