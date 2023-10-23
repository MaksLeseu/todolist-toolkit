import React, {FC, useState} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import {GeneralIconButton} from "../GeneralIconButton/GeneralIconButton";
import {MSG_BTN} from "../../utils/constans/app-messages.const";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {TaskGrouping} from "./TaskGrouping/TaskGrouping";

type Props = {
    anchorEl: AnchorElType
    handleClosePopover: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const DisplayPopover: FC<Props> = (props) => {
    const {anchorEl, handleClosePopover} = props

    const [isOpen, setIsOpen] = useState<AnchorElType>(null)

    const handleCloseTaskGrouping = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setIsOpen(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setIsOpen(event.currentTarget);
    };

    return (
        <CustomPopover
            anchorEl={anchorEl}
            handleClosePopover={handleClosePopover}
        >
            <GeneralIconButton
                size={'small'}
                color={"default"}
                disableRipple={true}
                primary={MSG_BTN.TASK_GROUPING}
                textStyles={{marginLeft: '10px'}}
                childrenIconFirstPosition={<AutoAwesomeMotionIcon/>}
                childrenIconSecondPosition={<ArrowDropDownIcon/>}
                onClick={handleClick}
            />
            <TaskGrouping
                anchorEl={isOpen}
                handleClosePopover={handleCloseTaskGrouping}
            />
        </CustomPopover>
    )
}