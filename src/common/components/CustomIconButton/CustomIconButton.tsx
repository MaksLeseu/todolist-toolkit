import React, {FC, ReactNode} from "react";
import {IconButton} from "@mui/material";

type Props = {
    size: "small" | "medium" | "large" | undefined
    color: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined
    disableRipple: boolean
    children: ReactNode
    sx?: Object
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const CustomIconButton: FC<Props> = (props) => {
    const {size, color, disableRipple, children, sx, onClick} = props

    return (
        <IconButton
            size={size}
            color={color}
            disableRipple={disableRipple}
            sx={sx && sx}
            onClick={onClick}
        >
            {children}
        </IconButton>
    )
}