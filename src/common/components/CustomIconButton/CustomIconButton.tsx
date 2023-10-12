import React, {FC, ReactNode} from "react";
import {IconButton} from "@mui/material";

type Props = {
    size?: "small" | "medium" | "large"
    color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
    disableRipple: boolean
    edge?: false | "start" | "end"
    children: ReactNode
    sx?: Object
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
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