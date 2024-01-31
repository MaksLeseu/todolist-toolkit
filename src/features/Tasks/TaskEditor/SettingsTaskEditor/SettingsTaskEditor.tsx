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
import {useMediaQuery} from "@mui/material";

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

    const {date, settingDate, resetDate} = useSettingDate()
    const {priority, settingPriority} = useSettingPriority()
    const {isOpenCalendar, openCloseCalendar} = useOpenCloseCalendar()
    const {isOpenPriority, openClosePriority} = useOpenClosePriority()

    const closeDeadlineCalender = () => {
        date.deadline && updateTask(taskStartDate, date.deadline, taskPriority)
        resetDate('deadline')
        openCloseCalendar('close')
    }
    const closeStartDateCalendar = () => {
        date.startDate && updateTask(date.startDate, taskDeadline, taskPriority)
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
                sx={{
                    width: 130,
                    height: 30,
                    borderRadius: '4px',
                    border: '1px solid var(--primary, #704ECC)',
                    boxShadow: '1px 1px 3px rgba(140, 97, 255, 0.35)',
                    margin: '0 auto 5px auto !important',
                }}
                onClick={resetDate}
            >
                <ListItemButton
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: 30,
                    }}
                >
                    <ListItemIcon
                        sx={{display: 'flex', alignItems: 'center'}}
                    >
                        <DoNotDisturbAltIcon
                            sx={{
                                color: 'secondary.main',
                                width: 14,
                                height: 14
                            }}
                        />
                        <ListItemText
                            sx={{
                                color: 'secondary.main',
                                '& .MuiListItemText-primary': {
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }
                            }}
                            primary={'Reset date'}
                        />
                    </ListItemIcon>
                </ListItemButton>
            </CustomIconButton>);

    const deadlineLabel = taskDeadline ? dateConversionToString(dayjs(taskDeadline)) : date.deadline && dateConversionToString(date.deadline) || 'Set deadline'
    const startDateLabel = taskStartDate ? dateConversionToString(dayjs(taskStartDate)) : date.startDate && dateConversionToString(date.startDate) || 'Set start date'
    const priorityLabel = priority === null ? priorityConversionToString(taskPriority) : priorityConversionToString(priority)

    const matches640 = useMediaQuery('(max-width:640px)');

    return (
        <>
            <SettingsButton
                title={'StartDate'}
                label={startDateLabel ? startDateLabel : null}
                sx={calenderStyles}
                children={
                    <BaseCalendar
                        openCalendar={isOpenCalendar.openStartDate}
                        currentDate={taskStartDate}
                        transformStyle={matches640 ? 'translate(20%, 0%)' : ''}
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
                        currentDate={taskDeadline}
                        transformStyle={matches640 ? 'translate(20%, 0%)' : ''}
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