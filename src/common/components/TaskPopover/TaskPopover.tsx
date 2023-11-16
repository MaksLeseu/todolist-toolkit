import React, {FC, useState} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {MSG_BTN} from "../../utils/constans/app-messages.const";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {ConfirmationModalWindow} from "../СonfirmationModalWindow/СonfirmationModalWindow";
import {GeneralIconButton} from "../GeneralIconButton/GeneralIconButton";

type Props = {
    taskId: string
    taskTitle: string
    anchorEl: AnchorElType
    removeTask: (taskId: string) => void
    handleClosePopover: (event: React.MouseEvent<HTMLButtonElement>) => void
    openTaskRedactor: () => void
}

export const TaskPopover: FC<Props> = (props) => {
    const {taskId, taskTitle, anchorEl, removeTask, handleClosePopover, openTaskRedactor} = props

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
            <GeneralIconButton
                size={'small'}
                color={"inherit"}
                disableRipple={true}
                primary={MSG_BTN.REMOVE_TASK}
                textStyles={{marginRight: '5px'}}
                childrenIconSecondPosition={<DeleteForeverIcon/>}
                onClick={changeConformation}
            />
            <GeneralIconButton
                size={'small'}
                color={"inherit"}
                disableRipple={true}
                primary={MSG_BTN.CHANGE_TASK}
                textStyles={{marginRight: '5px'}}
                childrenIconSecondPosition={<DriveFileRenameOutlineIcon/>}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation()
                    openTaskRedactor()
                }}
            />
            <ConfirmationModalWindow
                isOpen={isOpen}
                title={'task'}
                description={`This will delete ${taskTitle}`}
                actionConfirmation={handleOnClick}
                closeConfirmation={changeConformation}
            />
        </CustomPopover>
    )
}