import React, {FC, MouseEventHandler} from "react";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material";
import {MenuIcon} from "../../../common/components/Icons/MenuIcon";
import Box from "@mui/material/Box";

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
            <Box
                sx={{
                    width: '24px',
                    height: '24px'
                }}
            >
                <MenuIcon/>
            </Box>
        </CustomIconButton>
    )
}