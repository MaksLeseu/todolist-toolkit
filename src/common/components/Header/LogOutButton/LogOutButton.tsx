import React, {FC} from "react";
import {MSG_BTN} from "../../../constans/app-messages.const";
import {CustomButton} from "../../CustomButton/CustomButton";

type Props = {
    handlerLogout: () => void
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