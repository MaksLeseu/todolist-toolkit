import React, {FC, useState} from "react";
import s from './SettingsTaskEditor.module.css'
import {CustomButton} from "../../../../common/components/CustomButton/CustomButton";
import Divider from "@mui/material/Divider";
import {AnchorElType} from "../../../../common/components/CustomPopover/CustomPopover";
import {BaseCalendar} from "../../../../common/components/BaseCalendar/BaseCalendar";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import dayjs, {Dayjs} from "dayjs";
import {Priority} from "../../../../common/components/Priority/Priority";

type Props = {
    title: string
    taskId?: string
    todolistId?: string
    taskName?: string
    taskDescription?: string
    taskDeadline?: Dayjs | null
    taskStartDate?: Dayjs | null
    taskPriority?: number
    variant: 'deadline' | 'startDate' | 'priority'
    sx?: SxProps<Theme>
    handleSettingDeadline?: (deadline: Dayjs | null) => void
    handleSettingStartDate?: (startDate: Dayjs | null) => void
    handleSettingPriority?: (priority: number) => void
    updateTask?: (taskId: string, todolistId: string, title: string, description: string, deadline: Dayjs | null, startDate: Dayjs | null, priority: number) => void
}

export const SettingsTaskEditor: FC<Props> = (props) => {
    const {
        title,
        variant,
        sx,
        taskId,
        todolistId,
        taskName,
        taskDescription,
        taskDeadline,
        taskStartDate,
        taskPriority,
        handleSettingDeadline,
        handleSettingStartDate,
        handleSettingPriority,
        updateTask
    } = props

    const [isOpen, setIsOpen] = useState<AnchorElType>(null)
    const [deadline, setDeadline] = useState<Dayjs | null>(null)
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [priority, setPriority] = useState<number>(taskPriority ? taskPriority : 0)

    const callUpdateTask = (priority: number | undefined) => {
        const condition = updateTask && taskId && todolistId && taskName && taskDescription !== undefined && priority !== undefined
        condition && updateTask(taskId, todolistId, taskName, taskDescription, deadline, startDate, priority)
    }

    const handleCloseCalendar = () => {
        setIsOpen(null)
        callUpdateTask(taskPriority)
    }
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(event.currentTarget);
    };

    const handleClosePriority = () => setIsOpen(null)

    const settingDeadlineValue = (date: dayjs.Dayjs | null) => {
        setDeadline(date)
        handleSettingDeadline && handleSettingDeadline(date)
    }
    const settingStartDateValue = (date: dayjs.Dayjs | null) => {
        setStartDate(date)
        handleSettingStartDate && handleSettingStartDate(date)
    }

    const settingPriority = (priority: number) => {
        setPriority(priority)
        handleClosePriority()
        callUpdateTask(priority)

        handleSettingPriority && handleSettingPriority(priority)
    }

    const dateConversionToString = (date: dayjs.Dayjs) => dayjs(date).toString().slice(5, 16)

    const priorityConversionToString = (priority: number) => {
        switch (priority) {
            case 1:
                return 'Middle'
            case 2:
                return 'High'
            case 3:
                return 'Urgently'
            case 4:
                return 'Later'
            default:
                return 'Low';
        }
    }

    const deadlineValue = taskDeadline && dateConversionToString(taskDeadline)
    const startDateValue = taskStartDate && dateConversionToString(taskStartDate)

    const deadlineLabel = variant === 'deadline' && deadlineValue ? deadlineValue : deadline && dateConversionToString(deadline)
    const startDateLabel = variant === 'startDate' && startDateValue ? startDateValue : startDate && dateConversionToString(startDate)
    const priorityLabel = variant === 'priority' && priorityConversionToString(priority)

    return (
        <div>
            <p className={s.title}>{title}</p>
            <CustomButton
                color={'inherit'}
                label={deadlineLabel || startDateLabel || priorityLabel || 'Mistakes'}
                variant={'contained'}
                sx={{
                    width: '100%',
                    height: '25px',
                    textTransform: 'none',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    ...sx
                }}
                onClick={handleOpen}
            />
            <Divider/>
            {
                variant === 'deadline' &&
                <BaseCalendar
                    openCalendar={isOpen}
                    closeCalendar={handleCloseCalendar}
                    settingDate={settingDeadlineValue}
                />
            }
            {
                variant === 'startDate' &&
                <BaseCalendar
                    openCalendar={isOpen}
                    closeCalendar={handleCloseCalendar}
                    settingDate={settingStartDateValue}
                />
            }
            {
                variant === 'priority' &&
                <Priority
                    openPriority={isOpen}
                    closePriority={handleClosePriority}
                    settingPriority={settingPriority}
                />
            }
        </div>
    )
}
