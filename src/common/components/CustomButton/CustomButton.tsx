import React, {FC} from "react";
import {Button} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

type Props = {
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    label: string
    variant: 'contained' | 'text' | 'outlined'
    type?: 'submit' | 'reset' | 'button'
    size?: 'small' | 'medium' | 'large'
    sx?: SxProps<Theme>
    onClick?: () => void
}

export const CustomButton: FC<Props> = (props) => {
    const {label, color, variant, type, size, sx, onClick} = props

    return (
        <Button
            variant={variant}
            color={color}
            type={type}
            sx={sx}
            size={size}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

type PropsTwo = {
    label: string
}

export const CustomButtonTwo: FC<PropsTwo> = (props) => {
    const {label,} = props

    return (
        <Button
            sx={{}}
        >
            {label}
        </Button>
    )
}

