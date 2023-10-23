import React, {ChangeEvent, FC, useState} from "react";
import s from './Task.module.css'
import {MoreHoriz} from "../../common/components/MoreHoriz/MoreHoriz";
import {useAppDispatch} from "../../common/utils/hooks/useAppDispatch";
import {tasksThunk} from "./tasks.slice";
import {TaskEditor} from "./TaskEditor/TaskEditor";
import {TasksType} from "./tasks.types";
import {TaskStatuses} from "../../common/utils/enums";
import {CustomCheckbox} from "../../common/components/CustomCheckbox/CustomCheckbox";
import {PreviewCompletedTask} from "./PreviewCompletedTask/PreviewCompletedTask";

type Props = {
    taskId: string
    todolistId: string
    taskStatus: number
    taskTitle: string
    taskDescription: string
    todolistTitle: string
    task: TasksType
    setVisibleLiner: (value: boolean) => void
}

export const Task: FC<Props> = (props) => {
    const {taskId, taskTitle, taskDescription, todolistTitle, todolistId, taskStatus, setVisibleLiner} = props

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

    return (
        <div key={taskId} className={taskStatusCompleted ? s.taskCompleted : s.task}>
            <div className={s.container} onClick={taskStatusCompleted ? openPreviewCompletedTask : openTaskEditor}>

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

                    <MoreHoriz
                        taskId={taskId}
                        taskTitle={taskTitle}
                        removeTask={removeTask}
                    />
                </div>
                {
                    taskDescription && taskStatusNew &&
                    <div className={s.description}>{taskDescription}</div>
                }
            </div>
            <TaskEditor
                taskId={taskId}
                todolistId={todolistId}
                taskName={taskTitle}
                taskStatus={taskStatus}
                todolistTitle={todolistTitle}
                description={taskDescription}
                taskEditor={taskEditor}
                closeTaskEditor={closeTaskEditor}
                updateCheckbox={updateCheckbox}
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
    )
}

