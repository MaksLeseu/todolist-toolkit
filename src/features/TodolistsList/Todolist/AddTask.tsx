import React from "react";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export const AddTask = () => {
    return (
        <>
            <IconButton
                color={"inherit"}
                size={'small'}
                aria-label={'Add task'}
                >
                <AddIcon/>
            </IconButton>
        </>
    )
}