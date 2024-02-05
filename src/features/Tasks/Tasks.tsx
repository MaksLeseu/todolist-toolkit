import React, {FC} from "react";
import {StateTaskType} from "./tasks.slice";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {taskSelector} from "./task.selector";
import {TasksType} from "./tasks.types";
import {CustomLinearProgress} from "../../common/components/CustomLinearProgress/CustomLinearProgress";
import {Task} from "./Task";
import {TaskStatuses} from "../../common/utils/enums";
import {TodolistsType} from "../Todolists/todolists.types";
import s from './Task.module.css'
import {isOpenMenuSelector} from "../../app/app.selector";
import Divider from "@mui/material/Divider";

type Props = {
    todolistId: string
    visibleLiner: boolean
    todolist: TodolistsType
    todolistTitle: string
    setVisibleLiner: (value: boolean) => void
}

export const Tasks: FC<Props> = (props) => {
    const {todolistId, todolistTitle, todolist, visibleLiner, setVisibleLiner} = props

    const tasks: StateTaskType = useAppSelector(taskSelector)
    const isOpenMenu = useAppSelector(isOpenMenuSelector)
    const task: TasksType[] = tasks[todolistId]

    let filteredTasks = task

    if (todolist.filter === 'active') {
        filteredTasks = task.filter(ts => ts.status === TaskStatuses.New)
    }

    if (todolist.filter === 'completed') {
        filteredTasks = task.filter(ts => ts.status === TaskStatuses.Completed)
    }

    return (
        <>
            <CustomLinearProgress visible={visibleLiner} sx={{marginBottom: '10px'}}/>
            {
                filteredTasks.length > 0
                    ?
                    filteredTasks.map((ts: TasksType) =>
                        <>
                            <Task
                                key={ts.id}
                                taskId={ts.id}
                                todolistId={todolistId}
                                taskStatus={ts.status}
                                taskTitle={ts.title}
                                taskDescription={ts.description}
                                taskAddedDate={ts.addedDate}
                                taskDeadline={ts.deadline}
                                taskStartDate={ts.startDate}
                                taskPriority={ts.priority}
                                todolistTitle={todolistTitle}
                                task={ts}
                                setVisibleLiner={setVisibleLiner}
                            />
                            <Divider sx={{marginBottom: '10px'}}/>
                        </>)
                    :
                    <div className={isOpenMenu ? `${s.emptyOpenMenu} ${s.empty}` : s.empty}>
                        You don't have tasks. Click on button, that create a task !!!
                    </div>
            }
        </>
    )
}