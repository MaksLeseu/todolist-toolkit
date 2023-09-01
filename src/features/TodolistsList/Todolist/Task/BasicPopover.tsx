import React, {FC} from "react";
import Popover from '@mui/material/Popover';
import {Typography} from "@mui/material";

type BasicPopoverPropsType = {
    anchorEl: HTMLButtonElement | null
    handleClose: () => void
}

export const BasicPopover: FC<BasicPopoverPropsType> = (props) => {
    const open = Boolean(props.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={props.anchorEl}
                onClose={props.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>Delete task</Typography>
            </Popover>
        </>
    )
}