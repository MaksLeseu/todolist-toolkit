import React, {FC} from "react";
import {Button} from "@mui/material";

type Props = {
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    label: string
    sx: { marginRight: '10px' } | null
    handleClose?: () => void
    addTask?: () => void
}

export const CustomButton: FC<Props> = (props) => {
    const {label, color, sx, handleClose, addTask} = props

    return (
        <>
            <Button
                variant="contained"
                color={color}
                sx={sx}
                onClick={addTask || handleClose}
            >
                {label}
            </Button>
        </>
    )
}