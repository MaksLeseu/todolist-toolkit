import React, {FC} from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {CustomPopover} from "../CustomPopover/CustomPopover";
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";

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
            <CustomIconButton
                color={"inherit"}
                size={'small'}
                disableRipple={false}
                onClick={handleClick}
            >
                <MoreHorizIcon/>
            </CustomIconButton>
            <CustomPopover
                taskId={props.taskId}
                anchorEl={anchorEl}
                handleClosePopover={handleClosePopover}
                removeTask={props.removeTask}
            />
        </div>
    )
}