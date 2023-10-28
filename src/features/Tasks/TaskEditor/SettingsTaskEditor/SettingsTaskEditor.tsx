import React, {FC, useState} from "react";
import s from './SettingsTaskEditor.module.css'
import {CustomButton} from "../../../../common/components/CustomButton/CustomButton";
import Divider from "@mui/material/Divider";
import {AnchorElType} from "../../../../common/components/CustomPopover/CustomPopover";
import {BaseCalendar} from "../../../../common/components/BaseCalendar/BaseCalendar";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import dayjs, {Dayjs} from "dayjs";

type Props = {
    title: string
    label?: string | undefined
    taskId: string
    todolistId: string
    taskName: string
    taskDescription: string
    taskDeadline?: Dayjs | null
    taskStartDate?: Dayjs | null
    variant?: 'deadline' | 'startDate'
    sx?: SxProps<Theme>
    settingDateDeadline?: (deadline: Dayjs | null) => void
    handleSettingStartDate?: (startDate: Dayjs | null) => void
    updateTask: (taskId: string, todolistId: string, title: string, description: string, deadline: any, startDate: any) => void
}

export const SettingsTaskEditor: FC<Props> = (props) => {
    const {
        title,
        label,
        variant,
        sx,
        taskId,
        todolistId,
        taskName,
        taskDescription,
        taskDeadline,
        taskStartDate,
        settingDateDeadline,
        handleSettingStartDate,
        updateTask
    } = props

    const [openCalendar, setOpenCalendar] = useState<AnchorElType>(null)
    const [deadline, setDeadline] = useState<Dayjs | null>(null)
    const [startDate, setStartDate] = useState<Dayjs | null>(null)

    const handleCloseCalendar = () => {
        setOpenCalendar(null)
        updateTask(taskId, todolistId, taskName, taskDescription, deadline, startDate)
    }
    const handleOpenCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenCalendar(event.currentTarget);
    };

    const settingDeadline = (date: dayjs.Dayjs | null) => {
        setDeadline(date)
        settingDateDeadline && settingDateDeadline(date)
    }
    const settingStartDate = (date: dayjs.Dayjs | null) => {
        setStartDate(date)
        handleSettingStartDate && handleSettingStartDate(date)
    }

    const dateConversion = (date: dayjs.Dayjs) => dayjs(date).toString().slice(5, 16)

    const deadlineValue = taskDeadline && dateConversion(taskDeadline)
    const startDateValue = taskStartDate && dateConversion(taskStartDate)

    const deadlineLabel = variant === 'deadline' && deadlineValue ? deadlineValue : deadline && dateConversion(deadline)
    const startDateLabel = variant === 'startDate' && startDateValue ? startDateValue : startDate && dateConversion(startDate)

    return (
        <div>
            <p className={s.title}>{title}</p>
            <CustomButton
                color={'inherit'}
                label={deadlineLabel || startDateLabel || label}
                variant={'contained'}
                sx={{
                    width: '100%',
                    height: '25px',
                    textTransform: 'none',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    ...sx
                }}
                onClick={handleOpenCalendar}
            />
            <Divider/>
            {
                variant === 'deadline' &&
                <BaseCalendar
                    openCalendar={openCalendar}
                    handleCloseCalendar={handleCloseCalendar}
                    settingDate={settingDeadline}
                />
            }
            {
                variant === 'startDate' &&
                <BaseCalendar
                    openCalendar={openCalendar}
                    handleCloseCalendar={handleCloseCalendar}
                    settingDate={settingStartDate}
                />
            }
        </div>
    )
}
