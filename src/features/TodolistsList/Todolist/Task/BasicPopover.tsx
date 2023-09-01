import React, {FC} from "react";
import Popover from '@mui/material/Popover';
import {FormControlLabel, FormGroup, Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type BasicPopoverPropsType = {
    taskId: string
    anchorEl: HTMLButtonElement | null
    handleClosePopover: () => void
    removeTask: (taskId: string) => void
}

export const BasicPopover: FC<BasicPopoverPropsType> = (props) => {
    const open = Boolean(props.anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleOnClick = () => {
        props.removeTask(props.taskId)
        props.handleClosePopover()
    }

    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={props.anchorEl}
                onClose={props.handleClosePopover}
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
                                onClick={handleOnClick}
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