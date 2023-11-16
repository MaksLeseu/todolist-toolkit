import React, {FC} from "react";
import {SettingsButton} from "../SettingsButton/SettingsButton";
import {BaseCalendar} from "../../../../common/components/BaseCalendar/BaseCalendar";
import {Priority} from "../../../../common/components/Priority/Priority";
import {Nullable} from "../../../../common/utils/types/optional.types";
import dayjs, {Dayjs} from "dayjs";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {CustomIconButton} from "../../../../common/components/CustomIconButton/CustomIconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import ListItemText from "@mui/material/ListItemText";
import {dateConversionToString} from "../../../../common/utils/functions/dateConversionToString/dateConversionToString";
import {
    priorityConversionToString
} from "../../../../common/utils/functions/priorityConversionToString/priorityConversionToString";
import {useSettingDate} from "../../../../common/utils/hooks/useSettingDate";
import {useOpenCloseCalendar} from "../../../../common/utils/hooks/useOpenCloseCalendar";
import {useOpenClosePriority} from "../../../../common/utils/hooks/useOpenClosePriority";
import {useSettingPriority} from "../../../../common/utils/hooks/useSettingPriority";

type Props = {
    taskDeadline: Nullable<Dayjs>
    taskStartDate: Nullable<Dayjs>
    taskPriority: number
    calenderStyles?: SxProps<Theme>
    updateTask: (startDate: Nullable<Dayjs>, deadline: Nullable<Dayjs>, priority: number) => void
}

export const SettingsTaskEditor: FC<Props> = (props) => {
    const {
        taskPriority, taskDeadline, taskStartDate, calenderStyles, updateTask
    } = props

    const {startDate, deadline, settingDate, resetDate} = useSettingDate()
    const {priority, settingPriority} = useSettingPriority()
    const {isOpenCalendar, openCloseCalendar} = useOpenCloseCalendar()
    const {isOpenPriority, openClosePriority} = useOpenClosePriority()

    const closeDeadlineCalender = () => {
        deadline && updateTask(taskStartDate, deadline, taskPriority)
        resetDate('deadline')
        openCloseCalendar('close')
    }
    const closeStartDateCalendar = () => {
        startDate && updateTask(startDate, taskDeadline, taskPriority)
        resetDate('startDate')
        openCloseCalendar('close')
    }

    const settingPriorityHandle = (priority: number) => {
        settingPriority(priority)
        updateTask(taskStartDate, taskDeadline, priority)
        openClosePriority('close')
    }


    const resetStartDateHandle = () => {
        updateTask(null, taskDeadline, taskPriority)
        resetDate('startDate')
        openCloseCalendar('close')
    }
    const resetDeadlineHandle = () => {
        updateTask(taskStartDate, null, taskPriority)
        resetDate('deadline')
        openCloseCalendar('close')
    }

    const returnChildrenResetButton = (resetDate: () => void) =>
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
                        childrenResetButton={returnChildrenResetButton(resetStartDateHandle)}
                        closeCalendar={closeStartDateCalendar}
                        settingDate={(date) => settingDate(date, 'startDate')}
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
                        childrenResetButton={returnChildrenResetButton(resetDeadlineHandle)}
                        closeCalendar={closeDeadlineCalender}
                        settingDate={(date) => settingDate(date, 'deadline')}
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