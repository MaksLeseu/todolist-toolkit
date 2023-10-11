import React, {FC} from "react";
import {Button} from "@mui/material";

type Props = {
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    label: string
    variant: 'contained' | 'text' | 'outlined'
    type?: 'submit' | 'reset' | 'button'
    size?: 'small' | 'medium'
    sx?: Object
    onClick?: () => void
}

export const CustomButton: FC<Props> = (props) => {
    const {label, color, variant, type, size, sx, onClick} = props

    return (
        <Button
            variant={variant}
            color={color}
            type={type && type}
            sx={sx}
            size={size && size}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}