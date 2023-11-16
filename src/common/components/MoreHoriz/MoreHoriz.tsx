import React, {FC} from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {AnchorElType} from "../CustomPopover/CustomPopover";
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";
import {TaskPopover} from "../TaskPopover/TaskPopover";

type Props = {
    taskId: string
    taskTitle: string
    removeTask: (taskId: string) => void
    openTaskRedactor: () => void
}

export const MoreHoriz: FC<Props> = (props) => {
    const {taskId, taskTitle, removeTask, openTaskRedactor} = props

    const [anchorEl, setAnchorEl] = React.useState<AnchorElType>(null);

    const handleClosePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <CustomIconButton
                color={"inherit"}
                size={'small'}
                disableRipple={false}
                onClick={handleClick}
            >
                <MoreHorizIcon/>
            </CustomIconButton>
            <TaskPopover
                taskId={taskId}
                taskTitle={taskTitle}
                anchorEl={anchorEl}
                removeTask={removeTask}
                handleClosePopover={handleClosePopover}
                openTaskRedactor={openTaskRedactor}
            />
        </div>
    )
}