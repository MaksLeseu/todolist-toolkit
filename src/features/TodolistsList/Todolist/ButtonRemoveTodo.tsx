import React from "react";
import {IconButton} from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';

export const ButtonRemoveTodo = () => {
    return (
        <IconButton
            size={'small'}
        >
            <BackspaceIcon />
        </IconButton>
    )
}