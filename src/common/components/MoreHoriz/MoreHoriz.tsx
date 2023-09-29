import React, {FC} from "react";
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {BasicPopover} from "../BasicPopover/BasicPopover";

type MoreHorizPropsType = {
    taskId: string
    removeTask: (taskId: string) => void
}

export const MoreHoriz: FC<MoreHorizPropsType> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClosePopover = (event: any) => {
        event.stopPropagation()
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <IconButton
                color={"inherit"}
                size={'small'}
                onClick={handleClick}
            >
                <MoreHorizIcon/>
            </IconButton>
            <BasicPopover
                taskId={props.taskId}
                anchorEl={anchorEl}
                handleClosePopover={handleClosePopover}
                removeTask={props.removeTask}
            />
        </div>
    )
}