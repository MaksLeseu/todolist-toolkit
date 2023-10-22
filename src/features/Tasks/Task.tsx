import React, {ChangeEvent, FC, useState} from "react";
import s from './Task.module.css'
import {MoreHoriz} from "../../common/components/MoreHoriz/MoreHoriz";
import {useAppDispatch} from "../../common/utils/hooks/useAppDispatch";
import {tasksThunk} from "./tasks.slice";
import {TaskEditor} from "./TaskEditor/TaskEditor";
import {TasksType} from "./tasks.types";
import {TaskStatuses} from "../../common/utils/enums";
import {CustomCheckbox} from "../../common/components/CustomCheckbox/CustomCheckbox";

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
    const {taskId, taskTitle, taskDescription, task, todolistTitle, todolistId, taskStatus, setVisibleLiner} = props

    const dispatch = useAppDispatch()

    const [taskIdFromURL, setTaskIdFromUrl] = useState<string>('')
    const [taskEditor, setTaskEditor] = useState<boolean>(false)

    const openTaskEditor = (taskId: string) => {
        setTaskIdFromUrl(taskId)
        setTaskEditor(true)
    }
    const closeTaskEditor = () => setTaskEditor(false)

    const removeTask = (taskId: string) => {
        setVisibleLiner(true)
        dispatch(tasksThunk.removeTask({todolistId, taskId}))
            .finally(() => setVisibleLiner(false))
    }

    const stopPropagation = (e: any) => e.stopPropagation()

    const changeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked;

        setVisibleLiner(true)
        dispatch(tasksThunk.updateTask({
            todolistId, taskId,
            domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}
        }))
            .finally(() => setVisibleLiner(false))
    }

    return (
        <div key={taskId} className={s.task}>
            <div className={s.container} onClick={() => openTaskEditor(taskId)}>

                <div className={s.flexContainer}>
                    <div className={s.title}>
                        <div>
                            <CustomCheckbox
                                checked={taskStatus === TaskStatuses.Completed}
                                onChange={changeCheckbox}
                                stopPropagation={stopPropagation}
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
                    taskDescription &&
                    <div className={s.description}>{taskDescription}</div>
                }
            </div>
            {
                taskIdFromURL && taskIdFromURL === taskId && taskStatus === TaskStatuses.New &&
                <TaskEditor
                    taskId={taskId}
                    todolistId={todolistId}
                    task={task}
                    taskName={taskTitle}
                    taskStatus={taskStatus}
                    todolistTitle={todolistTitle}
                    description={taskDescription}
                    taskEditor={taskEditor}
                    closeTaskEditor={closeTaskEditor}
                    changeCheckbox={changeCheckbox}
                    stopPropagation={stopPropagation}
                />
            }
        </div>
    )
}

