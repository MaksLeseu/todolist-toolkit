import React, {FC, useState} from "react";
import {SettingsTaskEditor} from "../SettingsTaskEditor/SettingsTaskEditor";
import {BaseCalendar} from "../../../../common/components/BaseCalendar/BaseCalendar";
import {Priority} from "../../../../common/components/Priority/Priority";
import {dateConversionToString} from "../../../../common/utils/functions/dateConversionToString/dateConversionToString";
import {
    priorityConversionToString
} from "../../../../common/utils/functions/priorityConversionToString/priorityConversionToString";
import {Dayjs} from "dayjs";
import {AnchorElType} from "../../../../common/components/CustomPopover/CustomPopover";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {Nullable} from "../../../../common/utils/types/optional.types";

type Props = {
    taskDeadline?: Nullable<Dayjs>
    taskStartDate?: Nullable<Dayjs>
    taskPriority?: number
    sx?: SxProps<Theme>
    updateTask?: (startDate: Nullable<Dayjs>, deadline: Nullable<Dayjs>, priority: number) => void
    genericSettingFunction?: (value: Nullable<Dayjs> | number, method: 'startDate' | 'deadline' | 'priority') => void
}

export const GroupSettingsTaskEditor: FC<Props> = (props) => {
    const {
        taskDeadline,
        taskStartDate,
        taskPriority,
        sx,
        updateTask,
        genericSettingFunction
    } = props

    const deadlinePropsExist = updateTask && taskStartDate && taskPriority
    const startDatePropsExist = updateTask && taskDeadline && taskPriority
    const priorityPropsExist = updateTask && taskStartDate && taskDeadline

    const [openDeadlineCalender, setOpenDeadlineCalender] = useState<AnchorElType>(null)
    const [openStartDateCalender, setOpenStartDateCalender] = useState<AnchorElType>(null)
    const [openPriority, setOpenPriority] = useState<AnchorElType>(null)

    const [deadline, setDeadline] = useState<Nullable<Dayjs>>(null)
    const [startDate, setStartDate] = useState<Nullable<Dayjs>>(null)
    const [priority, setPriority] = useState<number>(taskPriority ? taskPriority : 0)

    const handleCloseDeadlineCalendar = () => {
        setOpenDeadlineCalender(null)

        deadlinePropsExist && updateTask(taskStartDate, deadline, taskPriority)
    }
    const handleOpenDeadlineCalendar = (event: React.MouseEvent<HTMLButtonElement>) => setOpenDeadlineCalender(event.currentTarget);

    const handleCloseStartDateCalender = () => {
        setOpenStartDateCalender(null)
        startDatePropsExist && updateTask(startDate, taskDeadline, taskPriority)
    }
    const handleOpenStartDateCalender = (event: React.MouseEvent<HTMLButtonElement>) => setOpenStartDateCalender(event.currentTarget)

    const handleOpenPriority = (event: React.MouseEvent<HTMLButtonElement>) => setOpenPriority(event.currentTarget);
    const handleClosePriority = () => setOpenPriority(null)

    const settingDeadlineValue = (date: Nullable<Dayjs>) => {
        setDeadline(date)
        genericSettingFunction && genericSettingFunction(date, 'deadline')
    }
    const settingStartDateValue = (date: Nullable<Dayjs>) => {
        setStartDate(date)
        genericSettingFunction && genericSettingFunction(date, 'startDate')
    }

    const settingPriority = (priority: number) => {
        setPriority(priority)
        handleClosePriority()
        priorityPropsExist && updateTask(taskStartDate, taskDeadline, priority)

        genericSettingFunction && genericSettingFunction(priority, 'priority')
    }


    const deadlineLabel = taskDeadline ? dateConversionToString(taskDeadline) : deadline && dateConversionToString(deadline)
    const startDateLabel = taskStartDate ? dateConversionToString(taskStartDate) : startDate && dateConversionToString(startDate)
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
                        title={'StartDate'}
                        closeCalendar={handleCloseStartDateCalender}
                        settingDate={settingStartDateValue}
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
                        title={'Deadline'}
                        closeCalendar={handleCloseDeadlineCalendar}
                        settingDate={settingDeadlineValue}
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
