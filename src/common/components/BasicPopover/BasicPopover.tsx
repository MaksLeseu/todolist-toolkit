import React, {FC} from "react";
import Popover from '@mui/material/Popover';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import {IconButton, ListItem} from "@mui/material";

type BasicPopoverPropsType = {
    taskId: string
    anchorEl: HTMLButtonElement | null
    handleClosePopover: (event: any) => void
    removeTask: (taskId: string) => void
}

export const BasicPopover: FC<BasicPopoverPropsType> = (props) => {
    const open = Boolean(props.anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.removeTask(props.taskId)
        props.handleClosePopover(event)
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
                {/*<FormGroup
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
                </FormGroup>*/}
                <ListItem sx={{display: 'block'}}>
                    <IconButton
                        size={'small'}
                        color={"inherit"}
                        disableRipple
                        onClick={handleOnClick}
                    >
                        <ListItemButton
                            sx={{height: '30px', borderRadius: '3px'}}
                        >
                            <ListItemIcon
                                sx={{display: 'flex', alignItems: 'center'}}
                            >
                                <ListItemText
                                    sx={{marginRight: '10px', color: 'black'}}
                                    primary={'Remove task'}
                                />
                                <DeleteForeverIcon/>
                            </ListItemIcon>
                        </ListItemButton>
                    </IconButton>
                </ListItem>
            </Popover>
        </>
    )
}