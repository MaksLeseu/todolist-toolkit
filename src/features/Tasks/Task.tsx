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
import {isOpenMenuSelector, modeSelector} from "../../app/app.selector";
import {useMediaQuery} from "@mui/material";
import {TaskEditor} from "./TaskEditor/TaskEditor";
import {SettingsTask} from "./SettingsTask";
import {CustomButtonGroup} from "../../common/components/CustomButtonGroup/CustomButtonGroup";
import {MSG_BTN} from "../../common/utils/constans/app-messages.const";
import {TaskRedactor} from "../../common/components/TaskRedactor/TaskRedactor";
import {useSettingDate} from "../../common/utils/hooks/useSettingDate";
import {useSettingPriority} from "../../common/utils/hooks/useSettingPriority";

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

    const taskStatusCompleted = taskStatus === TaskStatuses.Completed

    const dispatch = useAppDispatch()
    const isOpenMenu = useAppSelector(isOpenMenuSelector)
    const mode = useAppSelector(modeSelector)

    const {date, settingDate, resetDate} = useSettingDate()
    const {priority, settingPriority, resetPriority} = useSettingPriority()

    const [isOpen, setIsOpen] = useState<OpenModalWindowsType>({
        taskEditor: false,
        taskRedactor: false
    })

    const openCloseWindows = (action: 'open' | 'close', params?: 'editor' | 'redactor') => {
        if (action === 'close') {
            setIsOpen({
                taskEditor: false,
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
        event.stopPropagation()
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

    const resetAllValues = () => {
        resetDate('startDate')
        resetDate('deadline')
        resetPriority()
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
    const titleStylesForMobile = isOpenMenu ?
        {
            '@media (max-width: 730px)': {
                width: '300px',
            },
            '@media (max-width: 550px)': {
                width: '280px',
            }
        }
        :
        {
            '@media (max-width: 550px)': {
                width: '280px',
            }
        }
    const descriptionStylesForMobile = isOpenMenu ?
        {
            '@media (max-width: 1330px)': {
                width: '540px'
            },
            '@media (max-width: 1130px)': {
                width: '420px'
            },
            '@media (max-width: 950px)': {
                width: '380px'
            },
            '@media (max-width: 730px)': {
                width: '280px'
            },
        }
        :
        {
            '@media (max-width: 950px)': {
                width: '580px'
            },
            '@media (max-width: 730px)': {
                width: '380px'
            },
            '@media (max-width: 550px)': {
                width: '280px'
            }
        }

    const taskStyles = mode === 'dark' ? `${s.taskDarkMode} ${s.task}` : s.task
    const taskCompletedDarkMode = mode === 'dark' ? `${s.taskCompletedDark} ${s.taskCompleted}` : `${s.taskCompletedLight} ${s.taskCompleted}`
    const taskCompleteStyles = taskStatusCompleted ? taskCompletedDarkMode : taskStyles

    const isMistakeTextField = !!taskText.newTaskTitle && taskText.newTaskTitle.trim().length >= 100

    return (
        <div key={taskId} className={isOpen.taskRedactor ? s.openTaskRedactorStyles : taskCompleteStyles}>
            {
                isOpen.taskRedactor
                    ?
                    <TaskRedactor
                        taskRedactor={isOpen.taskRedactor}
                        valueTask={taskText.newTaskTitle}
                        valueDescription={taskText.newTaskDescription}
                        mistakeTextField={isMistakeTextField}
                        childrenGroupSettings={
                            <div
                                className={isOpenMenu ? `${s.groupSettingsContainer} ${s.groupSettingsContainerActive}` : s.groupSettingsContainer}>
                                <SettingsTask
                                    taskStartDate={taskStartDate}
                                    taskDeadline={taskDeadline}
                                    taskPriority={taskPriority}
                                    calenderStyles={{
                                        marginRight: '10px', width: '150px', fontSize: '16px',
                                        '@media (max-width: 740px)': {
                                            fontSize: '14px',
                                            width: '130px',
                                        },
                                    }}
                                    genericSettingFunction={settingDate}
                                    settingPriorityFunction={settingPriority}
                                />
                            </div>
                        }
                        childrenButtons={
                            <CustomButtonGroup
                                firstButtonLabel={MSG_BTN.CANCEL}
                                secondButtonLabel={MSG_BTN.SAVE}
                                mistakeTextField={isMistakeTextField}
                                firstButtonOnClick={() => openCloseWindows('close')}
                                secondButtonOnClick={updateHandle}
                            />
                        }
                        changeTitle={(e) => updateTaskText('title', e)}
                        changeSpecification={(e) => updateTaskText('description', e)}
                    />
                    :
                    <div className={s.container}
                         onClick={() => openCloseWindows('open', 'editor')}>

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
                                <Box
                                    sx={{
                                        color: 'text.primary',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '18px',
                                        fontStyle: 'normal',
                                        fontWeight: 700,
                                        lineHeight: '24px',
                                        marginBottom: '8px',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        width: '380px',
                                        height: '1.2em',
                                        whiteSpace: 'nowrap',
                                        ...titleStylesForMobile
                                    }}
                                >
                                    {taskTitle}
                                </Box>
                                {
                                    taskDescription &&
                                    <Box
                                        sx={{
                                            color: 'text.primary',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '24px',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            width: '680px',
                                            height: '1.2em',
                                            whiteSpace: 'nowrap',
                                            ...descriptionStylesForMobile
                                        }}
                                    >
                                        {taskDescription}
                                    </Box>
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
                secondActionMoreHoriz={() => {
                    openCloseWindows('open', 'redactor')
                    closeMoreHoriz()
                }}
                closeMoreHoriz={closeMoreHoriz}
            />
            <TaskEditor
                open={taskStatusCompleted ? false : isOpen.taskEditor}
                taskId={taskId}
                todolistId={todolistId}
                taskName={taskTitle}
                taskStatus={taskStatus}
                taskAddedDate={taskAddedDate}
                taskDeadline={taskDeadline}
                taskStartDate={taskStartDate}
                taskPriority={taskPriority}
                todolistTitle={todolistTitle}
                description={taskDescription}
                closeTaskEditor={() => openCloseWindows('close')}
                updateCheckbox={updateCheckbox}
                updateTask={updateTask}
            />
        </div>
    );
}

