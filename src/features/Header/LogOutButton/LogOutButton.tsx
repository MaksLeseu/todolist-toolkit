import React, {FC, MouseEventHandler} from "react";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";

type Props = {
    handlerLogout: MouseEventHandler
}

export const LogOutButton: FC<Props> = ({handlerLogout}) => {
    return (
        <>
            <CustomButton
                color={'inherit'}
                variant={'text'}
                label={MSG_BTN.LOG_OUT}
                onClick={handlerLogout}
            />
        </>
    )
}