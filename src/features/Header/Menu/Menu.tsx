import React, {FC, MouseEventHandler} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material";

type Props = {
    sx: SxProps<Theme>
    handleDrawerOpen: MouseEventHandler
}

export const Menu: FC<Props> = (props) => {
    const {sx, handleDrawerOpen} = props

    return (
        <CustomIconButton
            size={'medium'}
            color={'inherit'}
            disableRipple={false}
            edge="start"
            onClick={handleDrawerOpen}
            sx={sx}
        >
            <MenuIcon/>
        </CustomIconButton>
    )
}