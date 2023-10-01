import React, {FC} from "react";
import {Button} from "@mui/material";

type Props = {
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    label: string
    variant: 'contained' | 'text' | 'outlined'
    sx?: Object | null
    onClick: () => void
}

export const CustomButton: FC<Props> = (props) => {
    const {label, color, variant, sx, onClick} = props

    return (
        <Button
            variant={variant}
            color={color}
            sx={sx && sx}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}