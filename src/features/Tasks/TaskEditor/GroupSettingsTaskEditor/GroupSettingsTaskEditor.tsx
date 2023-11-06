import React, {FC, useState} from "react";
import {SettingsTaskEditor} from "../SettingsTaskEditor/SettingsTaskEditor";
import {BaseCalendar} from "../../../../common/components/BaseCalendar/BaseCalendar";
import {Priority} from "../../../../common/components/Priority/Priority";
import {dateConversionToString} from "../../../../common/utils/functions/dateConversionToString/dateConversionToString";
import {
    priorityConversionToString
} from "../../../../common/utils/functions/priorityConversionToString/priorityConversionToString";
import dayjs, {Dayjs} from "dayjs";
import {AnchorElType} from "../../../../common/components/CustomPopover/CustomPopover";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {Nullable} from "../../../../common/utils/types/optional.types";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import ListItemText from "@mui/material/ListItemText";
import {CustomIconButton} from "../../../../common/components/CustomIconButton/CustomIconButton";

type Props = {
    taskDeadline?: Nullable<Dayjs>
    taskStartDate?: Nullable<Dayjs>
    taskPriority?: number
    sx?: SxProps<Theme>
    resetButton: boolean
    updateTask?: (startDate: Nullable<Dayjs>, deadline: Nullable<Dayjs>, priority: number) => void
    genericSettingFunction?: (value: Nullable<Dayjs> | number, method: 'startDate' | 'deadline' | 'priority') => void
}

export const GroupSettingsTaskEditor: FC<Props> = (props) => {
    const {
        taskDeadline,
        taskStartDate,
        taskPriority,
        sx,
        resetButton,
        updateTask,
        genericSettingFunction
    } = props

    const deadlinePropsExist = updateTask && taskStartDate !== undefined && taskPriority
    const startDatePropsExist = updateTask && taskDeadline !== undefined && taskPriority
    const priorityPropsExist = updateTask && taskStartDate !== undefined && taskDeadline !== undefined

    const [openDeadlineCalender, setOpenDeadlineCalender] = useState<AnchorElType>(null)
    const [openStartDateCalender, setOpenStartDateCalender] = useState<AnchorElType>(null)
    const [openPriority, setOpenPriority] = useState<AnchorElType>(null)

    const [deadline, setDeadline] = useState<Nullable<Dayjs>>(null)
    const [startDate, setStartDate] = useState<Nullable<Dayjs>>(null)
    const [priority, setPriority] = useState<number>(taskPriority ? taskPriority : 1)

    const handleCloseDeadlineCalendar = () => {
        setOpenDeadlineCalender(null)
        deadlinePropsExist && deadline && updateTask(taskStartDate, deadline, taskPriority)
    }
    const handleOpenDeadlineCalendar = (event: React.MouseEvent<HTMLButtonElement>) => setOpenDeadlineCalender(event.currentTarget);

    const handleCloseStartDateCalender = () => {
        setOpenStartDateCalender(null)
        startDatePropsExist && startDate && updateTask(startDate, taskDeadline, taskPriority)
    }
    const handleOpenStartDateCalender = (event: React.MouseEvent<HTMLButtonElement>) => setOpenStartDateCalender(event.currentTarget)

    const handleOpenPriority = (event: React.MouseEvent<HTMLButtonElement>) => setOpenPriority(event.currentTarget);
    const handleClosePriority = () => setOpenPriority(null)

    const settingDeadlineValue = (date: Nullable<Dayjs>) => {
        date && setDeadline(date)
        genericSettingFunction && genericSettingFunction(date, 'deadline')
    }
    const settingStartDateValue = (date: Nullable<Dayjs>) => {
        date && setStartDate(date)
        genericSettingFunction && genericSettingFunction(date, 'startDate')
    }

    const settingPriority = (priority: number) => {
        setPriority(priority)
        handleClosePriority()
        priorityPropsExist && updateTask(taskStartDate, taskDeadline, priority)

        genericSettingFunction && genericSettingFunction(priority, 'priority')
    }

    const resetStartDate = () => {
        setStartDate(null)
        startDatePropsExist && taskStartDate && updateTask(null, taskDeadline, taskPriority)
        setOpenStartDateCalender(null)
    }
    const resetDeadline = () => {
        setDeadline(null)
        deadlinePropsExist && taskDeadline && updateTask(taskStartDate, null, taskPriority)
        setOpenDeadlineCalender(null)
    }

    const returnChildrenResetButton = (resetDate: () => void) => resetButton &&
        (
            <CustomIconButton
                disableRipple={true}
                color={'inherit'}
                onClick={resetDate}
            >
                <ListItemButton
                    sx={{height: '30px', borderRadius: '3px'}}
                >
                    <ListItemIcon
                        sx={{display: 'flex', alignItems: 'center'}}
                    >
                        <DoNotDisturbAltIcon/>
                        <ListItemText
                            sx={{color: 'black', marginLeft: '10px'}}
                            primary={'Reset date.'}
                        />
                    </ListItemIcon>
                </ListItemButton>
            </CustomIconButton>);

    const deadlineLabel = taskDeadline ? dateConversionToString(dayjs(taskDeadline)) : deadline && dateConversionToString(deadline) || 'Set deadline'
    const startDateLabel = taskStartDate ? dateConversionToString(dayjs(taskStartDate)) : startDate && dateConversionToString(startDate) || 'Set start date'
    const priorityLabel = priorityConversionToString(priority)

    return (
        <>
            <SettingsTaskEditor
                title={'StartDate'}
                label={startDateLabel ? startDateLabel : null}
                sx={sx}
                children={
                    <BaseCalendar
                        openCalendar={openStartDateCalender}
                        childrenResetButton={returnChildrenResetButton(resetStartDate)}
                        closeCalendar={handleCloseStartDateCalender}
                        settingDate={settingStartDateValue}
                        resetDate={resetStartDate}
                    />
                }
                handleOpen={handleOpenStartDateCalender}
            />
            <SettingsTaskEditor
                title={'Deadline'}
                label={deadlineLabel ? deadlineLabel : null}
                sx={sx}
                children={
                    <BaseCalendar
                        openCalendar={openDeadlineCalender}
                        childrenResetButton={returnChildrenResetButton(resetDeadline)}
                        closeCalendar={handleCloseDeadlineCalendar}
                        settingDate={settingDeadlineValue}
                        resetDate={resetDeadline}
                    />
                }
                handleOpen={handleOpenDeadlineCalendar}
            />
            <SettingsTaskEditor
                title={'Priority'}
                label={priorityLabel}
                sx={sx}
                children={
                    <Priority
                        openPriority={openPriority}
                        closePriority={handleClosePriority}
                        settingPriority={settingPriority}
                    />
                }
                handleOpen={handleOpenPriority}
            />
        </>
    )
}
