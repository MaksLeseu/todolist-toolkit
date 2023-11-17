import React, {FC, MouseEventHandler, ReactElement} from "react";
import {Button} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

type Props = {
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    label: string | undefined
    icon?: ReactElement
    variant: 'contained' | 'text' | 'outlined'
    type?: 'submit' | 'reset' | 'button'
    size?: 'small' | 'medium' | 'large'
    sx?: SxProps<Theme>
    onClick?: MouseEventHandler | undefined
}

export const CustomButton: FC<Props> = (props) => {
    const {label, color, variant, type, size, icon, sx, onClick} = props

    return (
        <Button
            variant={variant}
            color={color}
            type={type}
            sx={sx}
            size={size}
            onClick={onClick}
        >
            {icon}{label}
        </Button>
    )
}


