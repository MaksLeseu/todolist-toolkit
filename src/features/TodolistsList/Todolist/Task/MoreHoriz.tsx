import React from "react";
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const MoreHoriz = () => {
    return (
        <>
            <IconButton
                color={"inherit"}
                size={'small'}
            >
                <MoreHorizIcon />
            </IconButton>
        </>
    )
}