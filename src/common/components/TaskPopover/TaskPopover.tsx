import React, {FC, useState} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {MSG_BTN} from "../../utils/constans/app-messages.const";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";
import {ConfirmationModalWindow} from "../СonfirmationModalWindow/СonfirmationModalWindow";

type Props = {
    taskId: string
    taskTitle: string
    anchorEl: AnchorElType
    removeTask: (taskId: string) => void
    handleClosePopover: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const TaskPopover: FC<Props> = (props) => {
    const {taskId, taskTitle, anchorEl, removeTask, handleClosePopover} = props

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const changeConformation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        removeTask(taskId)
        handleClosePopover(event)
    }

    return (
        <CustomPopover
            anchorEl={anchorEl}
            handleClosePopover={handleClosePopover}
        >
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
            <ConfirmationModalWindow
                isOpen={isOpen}
                title={'task'}
                description={taskTitle}
                actionConfirmation={handleOnClick}
                closeConfirmation={changeConformation}
            />
        </CustomPopover>
    )
}