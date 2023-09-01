import React from "react";
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {BasicPopover} from "./BasicPopover";

export const MoreHoriz = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <IconButton
                color={"inherit"}
                size={'small'}
                onClick={handleClick}
            >
                <MoreHorizIcon />
            </IconButton>
            <BasicPopover
                anchorEl={anchorEl}
                handleClose={handleClose}
            />
        </>
    )
}