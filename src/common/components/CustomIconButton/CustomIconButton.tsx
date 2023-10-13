import React, {FC, MouseEventHandler, ReactNode} from "react";
import {IconButton, Theme} from "@mui/material";
import {SxProps} from "@mui/system";

type Props = {
    size?: "small" | "medium" | "large"
    color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
    disableRipple: boolean
    edge?: false | "start" | "end"
    children: ReactNode
    sx?: SxProps<Theme>
    onClick: MouseEventHandler | undefined
}

export const CustomIconButton: FC<Props> = (props) => {
    const {size, color, disableRipple, edge, children, sx, onClick} = props

    return (
        <IconButton
            size={size}
            color={color}
            disableRipple={disableRipple}
            edge={edge}
            sx={sx}
            onClick={onClick}
        >
            {children}
        </IconButton>
    )
}