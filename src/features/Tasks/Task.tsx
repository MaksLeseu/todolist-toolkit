import React, {ChangeEvent, FC, useEffect, useState} from "react";
import s from './Task.module.css'
import {useAppDispatch} from "../../common/utils/hooks/useAppDispatch";
import {tasksThunk} from "./tasks.slice";
import {TasksType} from "./tasks.types";
import {TaskStatuses} from "../../common/utils/enums";
import {Dayjs} from "dayjs";
import {Nullable} from "../../common/utils/types/optional.types";
import {CustomCheckbox} from "../../common/components/CustomCheckbox/CustomCheckbox";
import Box from "@mui/material/Box";
import {MoreHoriz} from "../../common/components/MoreHoriz/MoreHoriz";
import {MoreHorizIcon} from "../../common/components/Icons/MoreHorizIcon";
import {CustomIconButton} from "../../common/components/CustomIconButton/CustomIconButton";

type Props = {
    taskId: string
    todolistId: string
    taskStatus: number
    taskTitle: string
    taskDescription: string
    taskAddedDate: string
    taskDeadline: Nullable<Dayjs>
    taskStartDate: Nullable<Dayjs>
    taskPriority: number
    todolistTitle: string
    task: TasksType
    setVisibleLiner: (value: boolean) => void
}

export type UpdateTaskParamsType = {
    taskId: string
    todolistId: string
    title: string
    description: string
    deadline: Nullable<Dayjs>
    startDate: Nullable<Dayjs>
    priority: number
    closeTaskRedactor: () => void
}

export const Task: FC<Props> = (props) => {
    const {
        taskId,
        taskTitle,
        taskDescription,
        taskAddedDate,
        taskDeadline,
        taskStartDate,
        taskPriority,
        todolistTitle,
        todolistId,
        taskStatus,
        setVisibleLiner
    } = props

    const taskStatusNew = taskStatus === TaskStatuses.New
    const taskStatusCompleted = taskStatus === TaskStatuses.Completed

    const dispatch = useAppDispatch()

    const [taskEditor, setTaskEditor] = useState<boolean>(false)
    const [previewCompletedTask, setPreviewCompletedTask] = useState<boolean>(false)

    const openTaskEditor = () => setTaskEditor(true)
    const closeTaskEditor = () => setTaskEditor(false)

    const openPreviewCompletedTask = () => setPreviewCompletedTask(true)
    const closePreviewCompletedTask = () => setPreviewCompletedTask(false)

    const removeTask = (taskId: string) => {
        setVisibleLiner(true)
        dispatch(tasksThunk.removeTask({todolistId, taskId}))
            .finally(() => setVisibleLiner(false))
    }

    const updateCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked;

        setVisibleLiner(true)
        dispatch(tasksThunk.updateTask({
            todolistId, taskId,
            domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}
        }))
            .then(() => closeTaskEditor())
            .catch(() => console.log('Some mistake!'))
            .finally(() => setVisibleLiner(false))
        closePreviewCompletedTask()
    }

    const updateTask = (params: UpdateTaskParamsType) => {
        dispatch(tasksThunk.updateTask({
            todolistId,
            taskId,
            domainModel: {
                title: params.title,
                description: params.description,
                priority: params.priority,
                deadline: params.deadline,
                startDate: params.startDate
            }
        }))
        params.closeTaskRedactor()
    }

    const [isOpenTaskRedactor, setIsOpenTaskRedactor] = useState<boolean>(false)
    const [newTaskTitle, setNewTaskTitle] = useState<string>(taskTitle)
    const [newTaskDescription, setNewTaskDescription] = useState<string>(taskDescription)

    useEffect(() => {
        setNewTaskTitle(taskTitle)
        setNewTaskDescription(taskDescription)
    }, [taskTitle || taskDescription])

    const updateTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const updateDescription = (e: ChangeEvent<HTMLInputElement>) => setNewTaskDescription(e.currentTarget.value)

    const openTaskRedactor = () => setIsOpenTaskRedactor(true)
    const closeTaskRedactor = () => setIsOpenTaskRedactor(false)


    const [deadline, setDeadline] = useState<Nullable<Dayjs>>(null)
    const [startDate, setStartDate] = useState<Nullable<Dayjs>>(null)
    const [priority, setPriority] = useState<Nullable<number>>(null)

    const genericSettingFunction = (value: Nullable<Dayjs> | number, method: 'startDate' | 'deadline' | 'priority') => {
        const methodsForSettingValues = {
            'startDate': (startDate: Nullable<Dayjs> | number) => {
                setStartDate(startDate as Nullable<Dayjs>)
            },
            'deadline': (deadline: Nullable<Dayjs> | number) => {
                setDeadline(deadline as Nullable<Dayjs>)
            },
            'priority': (priority: number | Nullable<Dayjs>) => {
                setPriority(priority as number)
            },
        }
        methodsForSettingValues[method](value)
    }

    const resetAllValues = () => {
        setStartDate(null)
        setDeadline(null)
        setPriority(null)
    }

    const updateHandle = () => {
        let finallyDeadline = deadline
        let finallyStartDate = startDate
        let finallyPriority = priority
        if (deadline === null) finallyDeadline = taskDeadline ? taskDeadline : deadline
        if (startDate === null) finallyStartDate = taskStartDate ? taskStartDate : startDate
        if (finallyPriority === null) finallyPriority = taskPriority

        updateTask({
            taskId,
            todolistId,
            title: newTaskTitle,
            description: newTaskDescription,
            deadline: finallyDeadline,
            startDate: finallyStartDate,
            priority: finallyPriority,
            closeTaskRedactor
        })
        resetAllValues()
    }

    const [isOpenMoreHoriz, setIsOpenMoreHoriz] = useState<HTMLButtonElement | null>(null)
    const closeMoreHoriz = () => setIsOpenMoreHoriz(null)
    const openMoreHoriz = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenMoreHoriz(event.currentTarget)
        event.preventDefault()
    }

    const activeStylesButtonMoreHoriz: object | null = isOpenMoreHoriz ? {
        backgroundColor: 'primary.main',
        boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.25) inset, -1px -1px 2px 0px rgba(0, 0, 0, 0.25) inset',
    } : null

    return (
        <div key={taskId} className={/*taskStatusCompleted ? s.taskCompleted : */s.task}>
            {
                !isOpenTaskRedactor &&
                <div className={s.container}
                     onClick={taskStatusCompleted ? openPreviewCompletedTask : openTaskEditor}>

                    <div className={s.flexContainer}>
                        <div className={s.title}>
                            <Box sx={{
                                width: '34px',
                                height: '34px',
                                gridColumn: 1,
                                alignSelf: 'center',
                                position: 'relative',
                            }}>
                                <CustomCheckbox
                                    sx={{
                                        width: '24px',
                                        height: '24px',
                                        position: 'absolute',
                                        top: '13%',
                                        left: '13%',
                                        color: '#704ECC',
                                        '&.Mui-checked': {
                                            color: '#FF8811',
                                        },
                                    }}
                                    disableRipple={true}
                                    checked={taskStatusCompleted}
                                    onChange={updateCheckbox}
                                />
                            </Box>
                            <div>
                                <div className={s.text}>{taskTitle}</div>
                                {
                                    taskDescription && /*taskStatusNew &&*/
                                    <div className={s.description}>{taskDescription}</div>
                                }
                            </div>
                            <CustomIconButton
                                disableRipple={false}
                                sx={{
                                    alignSelf: 'center',
                                    width: '24px',
                                    height: '24px',
                                    objectFit: 'cover',
                                    borderRadius: '2px',
                                    ...activeStylesButtonMoreHoriz,
                                }}
                                onClick={openMoreHoriz}
                            >
                                <Box sx={{
                                    width: '24px',
                                    height: '24px',
                                    objectFit: 'cover'
                                }}>
                                    <MoreHorizIcon/>
                                </Box>
                            </CustomIconButton>
                        </div>
                    </div>
                </div>
            }
            <MoreHoriz
                isOpen={isOpenMoreHoriz}
                taskId={taskId}
                transformPopover={'translate(0%, -15%)'}
                actionMoreHoriz={removeTask}
                closeMoreHoriz={closeMoreHoriz}
            />
        </div>
    );
}

