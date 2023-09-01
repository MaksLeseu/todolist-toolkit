import React, {FC} from "react";
import Popover from '@mui/material/Popover';
import {FormControlLabel, FormGroup, Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
                <FormGroup
                    sx={{ p: 2 }}
                >
                    <FormControlLabel
                        label={'Remove task'}
                        control={
                            <IconButton
                                size={'small'}
                                color={"inherit"}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        }
                    />
                </FormGroup>
            </Popover>
        </>
    )
}