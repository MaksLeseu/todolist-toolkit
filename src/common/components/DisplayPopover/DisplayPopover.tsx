import React, {FC, useState} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import {GeneralIconButton} from "../GeneralIconButton/GeneralIconButton";
import {MSG_BTN} from "../../utils/constans/app-messages.const";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {TaskGrouping} from "./TaskGrouping/TaskGrouping";
import {TodolistFilterType} from "../../../features/Todolists/todolists.types";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

type Props = {
    openDisplay: AnchorElType
    valueTodoFilter: TodolistFilterType
    handleCloseDisplay: (event: React.MouseEvent<HTMLButtonElement>) => void
    changeTodolistsFilterHandler: (filter: TodolistFilterType) => void
}

export const DisplayPopover: FC<Props> = (props) => {
    const {openDisplay, valueTodoFilter, handleCloseDisplay, changeTodolistsFilterHandler} = props

    const [openTaskGrouping, setOpenTaskGrouping] = useState<AnchorElType>(null)

    const handleCloseTaskGrouping = () => setOpenTaskGrouping(null);
    const handleOpenTaskGrouping = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenTaskGrouping(event.currentTarget);
    };

    return (
        <CustomPopover
            anchorEl={openDisplay}
            handleClosePopover={handleCloseDisplay}
        >
            <GeneralIconButton
                size={'small'}
                color={"default"}
                disableRipple={true}
                primary={MSG_BTN.TASK_GROUPING}
                textStyles={{marginLeft: '10px'}}
                childrenIconFirstPosition={<AutoAwesomeMotionIcon/>}
                childrenIconSecondPosition={<ArrowDropDownIcon/>}
                onClick={handleOpenTaskGrouping}
            />
            <GeneralIconButton
                size={'small'}
                color={"default"}
                disableRipple={true}
                primary={MSG_BTN.TASK_SORTING}
                textStyles={{marginLeft: '10px'}}
                childrenIconFirstPosition={<CompareArrowsIcon/>}
                childrenIconSecondPosition={<ArrowDropDownIcon/>}
                onClick={() => {
                }}
            />
            <TaskGrouping
                openTaskGrouping={openTaskGrouping}
                valueTodoFilter={valueTodoFilter}
                handleCloseTaskGrouping={handleCloseTaskGrouping}
                changeTodolistsFilterHandler={changeTodolistsFilterHandler}
            />
        </CustomPopover>
    )
}