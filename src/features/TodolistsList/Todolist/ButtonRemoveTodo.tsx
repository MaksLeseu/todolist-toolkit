import React, {FC} from "react";
import {IconButton} from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';

type ButtonRemoveTodoPropsType = {
    onClick: () => void
}

export const ButtonRemoveTodo: FC<ButtonRemoveTodoPropsType> = (props) => {
    return (
        <IconButton
            size={'small'}
            onClick={props.onClick}
        >
            <BackspaceIcon />
        </IconButton>
    )
}