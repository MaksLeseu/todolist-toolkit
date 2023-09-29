import React, {FC, useState} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {TasksType} from "../../common/api/api";
import s from './Task.module.css'
import {MoreHoriz} from "../../common/components/MoreHoriz/MoreHoriz";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {tasksThunk} from "./tasks.slice";
import Checkbox from '@mui/material/Checkbox';
import {ModalWindow} from "../../common/components/ModalWindow/ModalWindow";

type Props = {
    todolistId: string
}

export const Task: FC<Props> = (props) => {
    const {todolistId} = props

    const [open, setOpen] = useState<boolean>(false)
    const [taskId, setTaskId] = useState<string>('')

    const openModelWindow = (taskId: string) => {
        setTaskId(taskId)
        setOpen(true)
    }
    const closeModelWindow = () => setOpen(false)

    const task = useSelector<AppRootStateType, any>(state => state.tasks[todolistId])
    const dispatch = useAppDispatch()

    const removeTask = (taskId: string) => dispatch(tasksThunk.removeTask({todolistId, taskId}))

    const changeCheckbox = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
    }

    const returnModalWindow = (title: string, description: string): JSX.Element =>
        <ModalWindow
            taskName={title}
            description={description}
            open={open}
            closeModelWindow={closeModelWindow}
        />

    return task && task.length > 0 ?
        task.map((ts: TasksType) => (
            <div key={ts.id} className={s.task}>
                <div className={s.container} onClick={() => openModelWindow(ts.id)}>
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
                    taskId
                    &&
                    taskId === ts.id
                    &&
                    returnModalWindow(ts.title, ts.description)
                }
            </div>
        ))
        :
        <div className={s.empty}>You don't have tasks.</div>
}

