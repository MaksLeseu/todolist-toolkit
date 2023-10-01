import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {MSG_BTN} from "../../../constans/app-messages.const";
import {CustomButton} from "../../CustomButton/CustomButton";

type Props = {
    handlerLogout: () => void
}

export const LogOutButton: FC<Props> = ({handlerLogout}) => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)

    return (
        <>
            {
                isLoggedIn
                &&
                <CustomButton
                    color={'inherit'}
                    variant={'text'}
                    label={MSG_BTN.LOG_OUT}
                    onClick={handlerLogout}
                />
            }
        </>
    )
}