import React, {FC, useState} from "react";
import Popover from '@mui/material/Popover';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import {ListItem} from "@mui/material";
import {MSG_BTN} from "../../utils/constans/app-messages.const";
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";
import {ConfirmationModalWindow} from "../СonfirmationModalWindow/СonfirmationModalWindow";

interface PopoverVirtualElement {
    getBoundingClientRect: () => DOMRect;
    nodeType: Node['ELEMENT_NODE'];
}

export type AnchorElType = | null
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement);

type Props = {
    taskId: string
    taskTitle: string
    anchorEl: AnchorElType
    handleClosePopover: (event: React.MouseEvent<HTMLButtonElement>) => void
    removeTask: (taskId: string) => void
}

export const CustomPopover: FC<Props> = (props) => {
    const {taskId, taskTitle, anchorEl, removeTask, handleClosePopover} = props

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const changeConformation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        removeTask(taskId)
        handleClosePopover(event)
    }

    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <ListItem sx={{display: 'block'}}>
                    <CustomIconButton
                        size={'small'}
                        color={"inherit"}
                        disableRipple={true}
                        onClick={changeConformation}
                    >
                        <ListItemButton
                            sx={{height: '30px', borderRadius: '3px'}}
                        >
                            <ListItemIcon
                                sx={{display: 'flex', alignItems: 'center'}}
                            >
                                <ListItemText
                                    sx={{marginRight: '10px', color: 'black'}}
                                    primary={MSG_BTN.REMOVE_TASK}
                                />
                                <DeleteForeverIcon/>
                            </ListItemIcon>
                        </ListItemButton>
                    </CustomIconButton>
                </ListItem>
                <ConfirmationModalWindow
                    isOpen={isOpen}
                    title={'task'}
                    description={taskTitle}
                    actionConfirmation={handleOnClick}
                    closeConfirmation={changeConformation}
                />
            </Popover>
        </>
    )
}