import React, {FC} from "react";
import {Button} from "@mui/material";

type Props = {
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    label: string
    sx: { marginRight: '10px' } | null
    value?: string
    handleClose?: () => void
    addTask?: (title: string) => void
}

export const CustomButton: FC<Props> = (props) => {
    const {label, color, sx, value, handleClose, addTask} = props
    const addTaskOnClick = addTask && value && addTask(value)
    const click = () => {
        alert('Some')
    }

    return (
        <>
            <Button
                variant="contained"
                color={color}
                sx={sx}
                onClick={addTaskOnClick || click}
            >
                {label}
            </Button>
        </>
    )
}