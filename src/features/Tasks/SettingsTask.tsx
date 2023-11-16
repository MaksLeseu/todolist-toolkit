import React, {FC} from "react";
import {SettingsButton} from "./TaskEditor/SettingsButton/SettingsButton";
import {BaseCalendar} from "../../common/components/BaseCalendar/BaseCalendar";
import {Priority} from "../../common/components/Priority/Priority";
import {dateConversionToString} from "../../common/utils/functions/dateConversionToString/dateConversionToString";
import dayjs, {Dayjs} from "dayjs";
import {
    priorityConversionToString
} from "../../common/utils/functions/priorityConversionToString/priorityConversionToString";
import {Nullable} from "../../common/utils/types/optional.types";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {useSettingDate} from "../../common/utils/hooks/useSettingDate";
import {useOpenCloseCalendar} from "../../common/utils/hooks/useOpenCloseCalendar";
import {useSettingPriority} from "../../common/utils/hooks/useSettingPriority";
import {useOpenClosePriority} from "../../common/utils/hooks/useOpenClosePriority";

type Props = {
    calenderStyles?: SxProps<Theme>
    taskDeadline: Nullable<Dayjs>
    taskStartDate: Nullable<Dayjs>
    taskPriority: number
    genericSettingFunction: (value: Nullable<Dayjs> | number, method: 'startDate' | 'deadline' | 'priority') => void
}

export const SettingsTask: FC<Props> = (props) => {
    const {calenderStyles, taskDeadline, taskPriority, taskStartDate, genericSettingFunction} = props

    const {startDate, deadline, settingDate} = useSettingDate()
    const {priority, settingPriority} = useSettingPriority()
    const {isOpenCalendar, openCloseCalendar} = useOpenCloseCalendar()
    const {isOpenPriority, openClosePriority} = useOpenClosePriority()

    const settingStartDateValueHandle = (date: Nullable<Dayjs>) => {
        settingDate(date, 'startDate')
        genericSettingFunction(date, 'startDate')
    }

    const settingDeadlineValueHandle = (date: Nullable<Dayjs>) => {
        settingDate(date, 'deadline')
        genericSettingFunction(date, 'deadline')
    }

    const settingPriorityHandle = (priority: number) => {
        settingPriority(priority)
        genericSettingFunction(priority, 'priority')
        openClosePriority('close')
    }


    const deadlineLabel = taskDeadline && deadline === null ? dateConversionToString(dayjs(taskDeadline)) : deadline && dateConversionToString(deadline) || 'Set deadline'
    const startDateLabel = taskStartDate && startDate === null ? dateConversionToString(dayjs(taskStartDate)) : startDate && dateConversionToString(startDate) || 'Set start date'
    const priorityLabel = priority === null ? priorityConversionToString(taskPriority) : priorityConversionToString(priority)

    return (
        <>
            <SettingsButton
                title={'StartDate'}
                label={startDateLabel ? startDateLabel : null}
                sx={calenderStyles}
                children={
                    <BaseCalendar
                        openCalendar={isOpenCalendar.openStartDate}
                        closeCalendar={() => openCloseCalendar('close')}
                        settingDate={settingStartDateValueHandle}
                    />
                }
                handleOpen={(event: React.MouseEvent<HTMLButtonElement>) => openCloseCalendar('open', 'startDate', event)}
            />
            <SettingsButton
                title={'Deadline'}
                label={deadlineLabel ? deadlineLabel : null}
                sx={calenderStyles}
                children={
                    <BaseCalendar
                        openCalendar={isOpenCalendar.openDeadline}
                        closeCalendar={() => openCloseCalendar('close')}
                        settingDate={settingDeadlineValueHandle}
                    />
                }
                handleOpen={(event: React.MouseEvent<HTMLButtonElement>) => openCloseCalendar('open', 'deadline', event)}
            />
            <SettingsButton
                title={'Priority'}
                label={priorityLabel}
                sx={calenderStyles}
                children={
                    <Priority
                        openPriority={isOpenPriority}
                        closePriority={() => openClosePriority('close')}
                        settingPriority={settingPriorityHandle}
                    />
                }
                handleOpen={(event: React.MouseEvent<HTMLButtonElement>) => openClosePriority('open', event)}
            />
        </>
    )
}