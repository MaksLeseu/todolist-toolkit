import React, {FC, useState} from "react";
import {SettingsButton} from "../SettingsButton/SettingsButton";
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

type _Props = {
    taskDeadline?: Nullable<Dayjs>
    taskStartDate?: Nullable<Dayjs>
    taskPriority?: number
    sx?: SxProps<Theme>
    resetButton: boolean
    updateTask?: (startDate: Nullable<Dayjs>, deadline: Nullable<Dayjs>, priority: number) => void
    genericSettingFunction?: (value: Nullable<Dayjs> | number, method: 'startDate' | 'deadline' | 'priority') => void
}

type Props = {
    calenderStyles?: SxProps<Theme>
    update?: DataUpdateProps
    collection?: DataCollectionProps
}

type DataCollectionProps = {
    genericSettingFunction: (value: Nullable<Dayjs> | number, method: 'startDate' | 'deadline' | 'priority') => void
}

type DataUpdateProps = {
    taskDeadline: Nullable<Dayjs>
    taskStartDate: Nullable<Dayjs>
    taskPriority: number
    updateTask: (startDate: Nullable<Dayjs>, deadline: Nullable<Dayjs>, priority: number) => void
}

export const GroupSettingsTaskEditor: FC<Props> = (props) => {
    const {
        calenderStyles,
        update,
        collection,
    } = props

    /*const deadlinePropsExist = update.updateTask && update.taskStartDate !== undefined && taskPriority
    const startDatePropsExist = updateTask && taskDeadline !== undefined && taskPriority
    const priorityPropsExist = updateTask && taskStartDate !== undefined && taskDeadline !== undefined*/

    const [openDeadlineCalender, setOpenDeadlineCalender] = useState<AnchorElType>(null)
    const [openStartDateCalender, setOpenStartDateCalender] = useState<AnchorElType>(null)
    const [openPriority, setOpenPriority] = useState<AnchorElType>(null)

    const [deadline, setDeadline] = useState<Nullable<Dayjs>>(null)
    const [startDate, setStartDate] = useState<Nullable<Dayjs>>(null)
    const [priority, setPriority] = useState<number>(update && update.taskPriority ? update.taskPriority : 1)

    const handleCloseDeadlineCalendar = () => {
        setOpenDeadlineCalender(null)
        update && deadline && update.updateTask(update.taskStartDate, deadline, update.taskPriority)
    }
    const handleOpenDeadlineCalendar = (event: React.MouseEvent<HTMLButtonElement>) => setOpenDeadlineCalender(event.currentTarget);

    const handleCloseStartDateCalender = () => {
        setOpenStartDateCalender(null)
        update && startDate && update.updateTask(startDate, update.taskDeadline, update.taskPriority)
    }
    const handleOpenStartDateCalender = (event: React.MouseEvent<HTMLButtonElement>) => setOpenStartDateCalender(event.currentTarget)

    const handleOpenPriority = (event: React.MouseEvent<HTMLButtonElement>) => setOpenPriority(event.currentTarget);
    const handleClosePriority = () => setOpenPriority(null)

    const settingDeadlineValue = (date: Nullable<Dayjs>) => {
        date && setDeadline(date)
        collection && collection.genericSettingFunction(date, 'deadline')
    }
    const settingStartDateValue = (date: Nullable<Dayjs>) => {
        date && setStartDate(date)
        collection && collection.genericSettingFunction(date, 'startDate')
    }

    const settingPriority = (priority: number) => {
        setPriority(priority)
        handleClosePriority()
        update && update.updateTask(update.taskStartDate, update.taskDeadline, priority)

        collection && collection.genericSettingFunction(priority, 'priority')
    }

    const resetStartDate = () => {
        setStartDate(null)
        update && update.updateTask(null, update.taskDeadline, update.taskPriority)
        setOpenStartDateCalender(null)
    }
    const resetDeadline = () => {
        setDeadline(null)
        update && update.updateTask(update.taskStartDate, null, update.taskPriority)
        setOpenDeadlineCalender(null)
    }

    const returnChildrenResetButton = (resetDate: () => void) => update &&
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

    const deadlineLabel = update && update.taskDeadline ? dateConversionToString(dayjs(update.taskDeadline)) : deadline && dateConversionToString(deadline) || 'Set deadline'
    const startDateLabel = update && update.taskStartDate ? dateConversionToString(dayjs(update.taskStartDate)) : startDate && dateConversionToString(startDate) || 'Set start date'
    const priorityLabel = priorityConversionToString(priority)

    return (
        <>
            <SettingsButton
                title={'StartDate'}
                label={startDateLabel ? startDateLabel : null}
                sx={calenderStyles}
                children={
                    <BaseCalendar
                        openCalendar={openStartDateCalender}
                        childrenResetButton={returnChildrenResetButton(resetStartDate)}
                        closeCalendar={handleCloseStartDateCalender}
                        settingDate={settingStartDateValue}
                    />
                }
                handleOpen={handleOpenStartDateCalender}
            />
            <SettingsButton
                title={'Deadline'}
                label={deadlineLabel ? deadlineLabel : null}
                sx={calenderStyles}
                children={
                    <BaseCalendar
                        openCalendar={openDeadlineCalender}
                        childrenResetButton={returnChildrenResetButton(resetDeadline)}
                        closeCalendar={handleCloseDeadlineCalendar}
                        settingDate={settingDeadlineValue}
                    />
                }
                handleOpen={handleOpenDeadlineCalendar}
            />
            <SettingsButton
                title={'Priority'}
                label={priorityLabel}
                sx={calenderStyles}
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
