import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../app/store";
import {TasksType} from "../../../../common/api/api";
import s from './Task.module.css'
import {MoreHoriz} from "./MoreHoriz";

type TaskPropsType = {
    todolistId: string
}

export const Task: FC<TaskPropsType> = (props) => {

    const task  = useSelector<AppRootStateType, any>(state => state.tasks[props.todolistId])

    return task && task.length > 0 ?
        task.map((ts: TasksType) => (
            <div key={ts.id} className={s.task}>
                <div className={s.container}>
                    <div className={s.text}>{ts.title}</div>
                    <MoreHoriz />
                </div>
            </div>
        ))
        :
        <div className={s.empty}>Todolist is empty!</div>
}