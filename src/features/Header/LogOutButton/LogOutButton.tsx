import React, {FC, MouseEventHandler} from "react";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {SignOutIcon} from "../../../common/components/Icons/SignOutIcon";
import Box from "@mui/material/Box";

type Props = {
    sx?: SxProps<Theme>
    colorIcon: '#704ECC' | 'white'
    handlerLogout: MouseEventHandler
}

export const LogOutButton: FC<Props> = ({sx, colorIcon, handlerLogout}) => {
    return (
        <CustomIconButton
            sx={sx}
            disableRipple={false}
            onClick={handlerLogout}
        >
            <Box sx={{marginRight: '4px', width: '16px', height: '16px'}}><SignOutIcon
                color={colorIcon}/></Box> {'Sign Out'}
        </CustomIconButton>
    )
}