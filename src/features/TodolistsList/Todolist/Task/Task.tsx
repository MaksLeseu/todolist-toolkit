import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../app/store";
import {TasksType} from "../../../../common/api/api";

type TaskPropsType = {
    todolistId: string
}

export const Task: FC<TaskPropsType> = (props) => {

    const task  = useSelector<AppRootStateType, any>(state => state.tasks[props.todolistId])

    return task && task.length > 0 ?
        task.map((ts: TasksType) => (
            <div key={ts.id}>
                {ts.title}
            </div>
        ))
        :
        <div>Todolist is empty!</div>
}