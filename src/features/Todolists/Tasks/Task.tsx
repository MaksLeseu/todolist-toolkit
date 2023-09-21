import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {TasksType} from "../../../common/api/api";
import s from './Task.module.css'
import {MoreHoriz} from "./MoreHoriz";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {tasksThunk} from "./tasks.slice";

type TaskPropsType = {
    todolistId: string
}

export const Task: FC<TaskPropsType> = (props) => {
    const task  = useSelector<AppRootStateType, any>(state => state.tasks[props.todolistId])
    const dispatch = useAppDispatch()

    const removeTask = (taskId: string) => {
        dispatch(tasksThunk.removeTask({todolistId: props.todolistId, taskId}))
    }


    return task && task.length > 0 ?
        task.map((ts: TasksType) => (
            <div key={ts.id} className={s.task}>
                <div className={s.container}>
                    <div className={s.text}>{ts.title}</div>
                    <MoreHoriz
                        taskId={ts.id}
                        removeTask={removeTask}
                    />
                </div>
            </div>
        ))
        :
        <div className={s.empty}>Todolist is empty!</div>
}