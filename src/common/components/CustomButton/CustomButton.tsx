import React, {FC} from "react";
import {Button} from "@mui/material";

type Props = {
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    label: string
    sx: { marginRight: '10px' } | null
}

export const CustomButton: FC<Props> = ({label, color, sx}) => {
    return (
        <>
            <Button
                variant="contained"
                color={color}
                sx={sx}
            >
                {label}
            </Button>
        </>
    )
}