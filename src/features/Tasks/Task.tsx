import React, {ChangeEvent, FC, useEffect, useState} from "react";
import s from './Task.module.css'
import {useAppDispatch} from "../../common/utils/hooks/useAppDispatch";
import {tasksThunk} from "./tasks.slice";
import {TaskEditor} from "./TaskEditor/TaskEditor";
import {TasksType} from "./tasks.types";
import {TaskStatuses} from "../../common/utils/enums";
import {PreviewCompletedTask} from "./PreviewCompletedTask/PreviewCompletedTask";
import {Dayjs} from "dayjs";
import {Nullable} from "../../common/utils/types/optional.types";
import {CustomCheckbox} from "../../common/components/CustomCheckbox/CustomCheckbox";
import {TaskRedactor} from "../../common/components/TaskRedactor/TaskRedactor";
import {MSG_BTN} from "../../common/utils/constans/app-messages.const";
import {CustomButtonGroup} from "../../common/components/CustomButtonGroup/CustomButtonGroup";
import {SettingsTask} from "./SettingsTask";

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

    return (
        <div key={taskId} className={taskStatusCompleted ? s.taskCompleted : s.task}>
            {
                !isOpenTaskRedactor &&
                <div className={s.container}
                     onClick={taskStatusCompleted ? openPreviewCompletedTask : openTaskEditor}>

                    <div className={s.flexContainer}>
                        <div className={s.title}>
                            <div>
                                <CustomCheckbox
                                    checked={taskStatusCompleted}
                                    onChange={updateCheckbox}
                                />
                            </div>
                            <div className={s.text}>{taskTitle}</div>
                        </div>

                        {/* <MoreHoriz
                            taskId={taskId}
                            taskTitle={taskTitle}
                            removeTask={removeTask}
                            openTaskRedactor={openTaskRedactor}
                        />*/}
                    </div>
                    {
                        taskDescription && taskStatusNew &&
                        <div className={s.description}>{taskDescription}</div>
                    }
                </div>
            }
            <TaskRedactor
                taskRedactor={isOpenTaskRedactor}
                valueTask={newTaskTitle}
                valueDescription={newTaskDescription}
                childrenGroupSettings={
                    <div className={s.groupSettingsContainer}>
                        <SettingsTask
                            taskStartDate={taskStartDate}
                            taskDeadline={taskDeadline}
                            taskPriority={taskPriority}
                            calenderStyles={{marginRight: '10px', width: '130px'}}
                            genericSettingFunction={genericSettingFunction}
                        />
                    </div>
                }
                childrenButtons={
                    <CustomButtonGroup
                        firstButtonLabel={MSG_BTN.CANCEL}
                        secondButtonLabel={MSG_BTN.SAVE}
                        firstButtonOnClick={closeTaskRedactor}
                        secondButtonOnClick={updateHandle}
                    />
                }
                changeTitle={updateTitle}
                changeSpecification={updateDescription}
            />
            <TaskEditor
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
                taskEditor={taskEditor}
                closeTaskEditor={closeTaskEditor}
                updateCheckbox={updateCheckbox}
                updateTask={updateTask}
            />
            <PreviewCompletedTask
                taskName={taskTitle}
                taskStatus={taskStatus}
                todolistTitle={todolistTitle}
                description={taskDescription}
                previewCompletedTask={previewCompletedTask}
                updateCheckbox={updateCheckbox}
                closePreviewCompletedTask={closePreviewCompletedTask}
            />
        </div>
    );
}

