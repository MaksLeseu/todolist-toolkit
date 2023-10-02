import React, {ChangeEvent, FC, useState} from "react";
import s from './Todolist.module.css'
import {Task} from "../../Tasks/Task";
import {AddTaskButton} from "../../Tasks/AddTaskButton/AddTaskButton";
import {useAppDispatch} from "../../../common/utils/hooks/useAppDispatch";
import DescriptionIcon from '@mui/icons-material/Description';
import {todolistsThunk} from "../todolists.slice";
import {tasksThunk} from "../../Tasks/tasks.slice";
import {MSG_BTN} from "../../../common/constans/app-messages.const";
import {FormAddTask} from "../../Tasks/FormAddTask/FormAddTask";

type Props = {
    todolistId: string
    todolistTitle: string
}

export const Todolist: FC<Props> = (props) => {
    const {todolistId, todolistTitle} = props

    const dispatch = useAppDispatch()

    const [formAddTask, setFormAddTask] = useState<boolean>(false)

    const [taskName, setTaskName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const changeTaskName = (e: ChangeEvent<HTMLInputElement>) => setTaskName(e.currentTarget.value)
    const changeDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)

    const openFormAddTask = () => setFormAddTask(true);

    const closeFormAddTask = () => {
        setFormAddTask(false)
        clearingStateTaskNameAndDescription()
    }

    const clearingStateTaskNameAndDescription = () => {
        setTaskName('')
        description && setDescription('')
    }

    const addTask = (title: string, description: string) => {
        dispatch(tasksThunk.addTask({todolistId: todolistId, title, description}))
        closeFormAddTask()
    }

    const removeTodolist = () => {
        dispatch(todolistsThunk.removeTodolist(todolistId))
    }

    return (
        <div>
            <div className={s.titleContainer}>
                <DescriptionIcon color={'info'}/>
                <h2>{todolistTitle}</h2>
            </div>
            <div className={s.todolist}>

                <Task todolistId={todolistId}/>

                {
                    formAddTask
                        ?
                        <FormAddTask
                            taskName={taskName}
                            description={description}
                            closeFormAddTask={closeFormAddTask}
                            changeTaskName={changeTaskName}
                            changeDescription={changeDescription}
                            addTask={addTask}
                        />
                        :
                        <AddTaskButton
                            label={MSG_BTN.ADD_A_TASK}
                            openFormAddTask={openFormAddTask}
                        />
                }

            </div>
        </div>
    )
}