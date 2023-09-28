import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {TasksType} from "../../common/api/api";
import s from './Task.module.css'
import {MoreHoriz} from "../../common/components/MoreHoriz/MoreHoriz";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {tasksThunk} from "./tasks.slice";
import Checkbox from '@mui/material/Checkbox';

type Props = {
    todolistId: string
}

export const Task: FC<Props> = (props) => {
    const {todolistId} = props

    const task = useSelector<AppRootStateType, any>(state => state.tasks[todolistId])
    const dispatch = useAppDispatch()

    const removeTask = (taskId: string) => dispatch(tasksThunk.removeTask({todolistId, taskId}))

    return task && task.length > 0 ?
        task.map((ts: TasksType) => (
            <div key={ts.id} className={s.task}>
                <div className={s.container}>
                    <div className={s.flexContainer}>
                        <div className={s.title}>
                            <Checkbox/>
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
            </div>
        ))
        :
        <div className={s.empty}>You don't have tasks.</div>
}

