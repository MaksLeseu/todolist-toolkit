import React, {FC, useState} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {MSG_BTN} from "../../utils/constans/app-messages.const";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {ConfirmationModalWindow} from "../СonfirmationModalWindow/СonfirmationModalWindow";
import {GeneralIconButton} from "../GeneralIconButton/GeneralIconButton";

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
            <GeneralIconButton
                size={'small'}
                color={"inherit"}
                disableRipple={true}
                primary={MSG_BTN.REMOVE_TASK}
                textStyles={{marginRight: '5px'}}
                childrenIconSecondPosition={<DeleteForeverIcon/>}
                onClick={changeConformation}
            />
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