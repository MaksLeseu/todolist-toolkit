import React, {FC} from "react";
import {StateTaskType} from "./tasks.slice";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {taskSelector} from "./task.selector";
import {TasksType} from "./tasks.types";
import {CustomLinearProgress} from "../../common/components/CustomLinearProgress/CustomLinearProgress";
import {Task} from "./Task";


type Props = {
    todolistId: string
    visibleLiner: boolean
    todolistTitle: string
    setVisibleLiner: (value: boolean) => void
}

export const Tasks: FC<Props> = (props) => {
    const {todolistId, todolistTitle, visibleLiner, setVisibleLiner} = props

    const tasks: StateTaskType = useAppSelector(taskSelector)
    const task: TasksType[] = tasks[todolistId]

    return (
        <>
            <CustomLinearProgress visible={visibleLiner}/>
            {
                task.length > 0
                    ?
                    task.map((ts: TasksType) =>
                        <Task
                            taskId={ts.id}
                            todolistId={todolistId}
                            taskStatus={ts.status}
                            taskTitle={ts.title}
                            taskDescription={ts.description}
                            todolistTitle={todolistTitle}
                            task={ts}
                            setVisibleLiner={setVisibleLiner}
                        />)
                    :
                    <div className={'s.empty'}>You don't have tasks. Click on button, that create a task !!!</div>
            }
        </>
    )
}