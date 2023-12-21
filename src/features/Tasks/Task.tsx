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
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {isOpenMenuSelector} from "../../app/app.selector";
import {useMediaQuery} from "@mui/material";

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

type OpenModalWindowsType = {
    taskEditor: boolean
    previewCompletedTask: boolean
    taskRedactor: boolean
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
    const isOpenMenu = useAppSelector(isOpenMenuSelector)

    const [isOpen, setIsOpen] = useState<OpenModalWindowsType>({
        taskEditor: false,
        previewCompletedTask: false,
        taskRedactor: false
    })

    const openCloseWindows = (action: 'open' | 'close', params?: 'editor' | 'preview' | 'redactor') => {
        if (action === 'close') {
            setIsOpen({
                taskEditor: false,
                previewCompletedTask: false,
                taskRedactor: false
            })
        } else if (action === 'open' && params) {
            const methodForOpen = {
                'editor': () => {
                    setIsOpen({
                        ...isOpen,
                        taskEditor: true,
                    })
                },
                'preview': () => {
                    setIsOpen({
                        ...isOpen,
                        previewCompletedTask: true,
                    })
                },
                'redactor': () => {
                    setIsOpen({
                        ...isOpen,
                        taskRedactor: true,
                    })
                }
            }
            return methodForOpen[params]()
        }
    }

    const [isOpenMoreHoriz, setIsOpenMoreHoriz] = useState<HTMLButtonElement | null>(null)
    const closeMoreHoriz = () => setIsOpenMoreHoriz(null)
    const openMoreHoriz = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenMoreHoriz(event.currentTarget)
        event.preventDefault()
    }

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
            .then(() => openCloseWindows('close'))
            .catch(() => console.log('Some mistake!'))
            .finally(() => setVisibleLiner(false))
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


    const [taskText, setTaskText] = useState<{ newTaskTitle: string, newTaskDescription: string }>({
        newTaskTitle: taskTitle,
        newTaskDescription: taskDescription
    })

    useEffect(() => {
        setTaskText({
            newTaskTitle: taskTitle,
            newTaskDescription: taskDescription
        })
    }, [taskTitle || taskDescription])

    const updateTaskText = (params: 'title' | 'description', e: ChangeEvent<HTMLInputElement>) => {
        const updateTextMethods = {
            'title': () => {
                setTaskText({
                    ...taskText,
                    newTaskTitle: e.currentTarget.value
                })
            },
            'description': () => {
                setTaskText({
                    ...taskText,
                    newTaskDescription: e.currentTarget.value
                })
            }
        }
        return updateTextMethods[params]()
    }

    const [priority, setPriority] = useState<Nullable<number>>(null)
    const [date, setDate] = useState<{ deadline: Nullable<Dayjs>, startDate: Nullable<Dayjs> }>({
        deadline: null,
        startDate: null,
    })

    const genericSettingFunction = (value: Nullable<Dayjs> | number, method: 'startDate' | 'deadline' | 'priority') => {
        const methodsForSettingValues = {
            'startDate': (startDate: Nullable<Dayjs> | number) => {
                setDate({
                    ...date,
                    startDate: startDate as Nullable<Dayjs>
                })
            },
            'deadline': (deadline: Nullable<Dayjs> | number) => {
                setDate({
                    ...date,
                    deadline: deadline as Nullable<Dayjs>
                })
            },
            'priority': (priority: number | Nullable<Dayjs>) => {
                setPriority(priority as number)
            },
        }
        methodsForSettingValues[method](value)
    }

    const resetAllValues = () => {
        setDate({
            startDate: null, deadline: null
        })
        setPriority(null)
    }

    const updateHandle = () => {
        let finallyDeadline = date.deadline
        let finallyStartDate = date.startDate
        let finallyPriority = priority
        if (date.deadline === null) finallyDeadline = taskDeadline ? taskDeadline : date.deadline
        if (date.startDate === null) finallyStartDate = taskStartDate ? taskStartDate : date.startDate
        if (finallyPriority === null) finallyPriority = taskPriority

        updateTask({
            taskId,
            todolistId,
            title: taskText.newTaskTitle,
            description: taskText.newTaskDescription,
            deadline: finallyDeadline,
            startDate: finallyStartDate,
            priority: finallyPriority,
            closeTaskRedactor: () => openCloseWindows('close')
        })
        resetAllValues()
    }

    const activeStylesButtonMoreHoriz: object | null = isOpenMoreHoriz ? {
        backgroundColor: 'primary.main',
        boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.25) inset, -1px -1px 2px 0px rgba(0, 0, 0, 0.25) inset',
    } : null

    const matches1030 = useMediaQuery('(max-width:1030px)');

    return (
        <div key={taskId} className={/*taskStatusCompleted ? s.taskCompleted : */s.task}>
            {
                !isOpen.taskRedactor &&
                <div className={s.container}
                     onClick={taskStatusCompleted ?
                         () => openCloseWindows('open', 'preview') :
                         () => openCloseWindows('open', 'editor')}>

                    <div className={isOpenMenu ? s.flexContainerActive : s.flexContainer}>
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
            }
            <MoreHoriz
                isOpen={isOpenMoreHoriz}
                taskId={taskId}
                transformPopover={matches1030 ? 'translate(-20%, -20%)' : 'translate(0%, -15%)'}
                transformMoreHoriz={matches1030 ? 'translate(0%, 80%)' : 'translate(4%, 28%)'}
                actionMoreHoriz={removeTask}
                closeMoreHoriz={closeMoreHoriz}
            />
        </div>
    );
}

