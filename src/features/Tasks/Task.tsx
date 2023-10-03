import React, {FC, useState} from "react";
import s from './Task.module.css'
import {MoreHoriz} from "../../common/components/MoreHoriz/MoreHoriz";
import {useAppDispatch} from "../../common/utils/hooks/useAppDispatch";
import {StateTaskType, tasksThunk} from "./tasks.slice";
import Checkbox from '@mui/material/Checkbox';
import {TaskEditor} from "./TaskEditor/TaskEditor";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {taskSelector} from "./task.selector";
import {TasksType} from "./tasks.types";

type Props = {
    todolistId: string
}

export const Task: FC<Props> = (props) => {
    const {todolistId} = props

    const tasks: StateTaskType = useAppSelector(taskSelector)
    const task: TasksType[] = tasks[todolistId]

    const dispatch = useAppDispatch()

    const [taskId, setTaskId] = useState<string>('')
    const [taskEditor, setTaskEditor] = useState<boolean>(false)

    const openTaskEditor = (taskId: string) => {
        setTaskId(taskId)
        setTaskEditor(true)
    }
    const closeTaskEditor = () => setTaskEditor(false)

    const removeTask = (taskId: string) => dispatch(tasksThunk.removeTask({todolistId, taskId}))

    const changeCheckbox = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
    }

    return (
        <>
            {
                task && task.length > 0 ?
                    task.map((ts: TasksType) => (
                        <div key={ts.id} className={s.task}>
                            <div className={s.container} onClick={() => openTaskEditor(ts.id)}>

                                <div className={s.flexContainer}>
                                    <div className={s.title}>
                                        <div>
                                            <Checkbox onClick={changeCheckbox}/>
                                        </div>
                                        <div className={s.text}>{ts.title}</div>
                                    </div>

                                    <MoreHoriz
                                        taskId={ts.id}
                                        removeTask={removeTask}
                                    />
                                </div>
                                {
                                    ts.description &&
                                    <div className={s.description}>{ts.description}</div>
                                }
                            </div>
                            {
                                taskId && taskId === ts.id &&
                                <TaskEditor
                                    taskName={ts.title}
                                    description={ts.description}
                                    taskEditor={taskEditor}
                                    closeTaskEditor={closeTaskEditor}
                                />
                            }
                        </div>
                    ))
                    :
                    <div className={s.empty}>You don't have tasks.</div>
            }
        </>
    )
}

