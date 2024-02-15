import React, {FC, MouseEventHandler, ReactElement} from "react";
import {Button} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

type Props = {
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    label: string | undefined
    additionalLabel?: string | undefined | ReactElement
    icon?: ReactElement
    iconFromTheEnd?: ReactElement
    variant: 'contained' | 'text' | 'outlined'
    type?: 'submit' | 'reset' | 'button'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    sx?: SxProps<Theme>
    onClick?: MouseEventHandler | undefined
}

export const CustomButton: FC<Props> = (props) => {
    const {label, additionalLabel, color, variant, type, size, icon, iconFromTheEnd, disabled, sx, onClick} = props

    return (
        <Button
            variant={variant}
            color={color}
            type={type}
            sx={sx}
            size={size}
            disabled={disabled}
            onClick={onClick}
        >
            {icon}{label}{additionalLabel}{iconFromTheEnd}
        </Button>
    )
}


