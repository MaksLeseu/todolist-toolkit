import React, {FC, MouseEventHandler} from "react";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {SignOutIcon} from "../../../common/components/Icons/SignOutIcon";

type Props = {
    sx?: SxProps<Theme>
    handlerLogout: MouseEventHandler
}

export const LogOutButton: FC<Props> = ({sx, handlerLogout}) => {
    return (
        <CustomIconButton
            sx={sx}
            disableRipple={false}
            onClick={handlerLogout}
        >
            <SignOutIcon/> {MSG_BTN.LOG_OUT}
        </CustomIconButton>
    )
}