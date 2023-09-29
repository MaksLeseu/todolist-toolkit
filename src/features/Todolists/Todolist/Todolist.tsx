import React, {ChangeEvent, FC, useState} from "react";
import s from './Todolist.module.css'
import {Task} from "../../Tasks/Task";
import {ButtonAddTask} from "../../Tasks/ButtonAddTask/ButtonAddTask";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import DescriptionIcon from '@mui/icons-material/Description';
import {todolistsThunk} from "./todolists.slice";
import {AddTaskModalWindow} from "../../Tasks/AddTaskModalWindow/AddTaskModalWindow";
import {tasksThunk} from "../../Tasks/tasks.slice";

type Props = {
    todolistId: string
    title: string
}

export const Todolist: FC<Props> = (props) => {
    const {todolistId, title} = props

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState<boolean>(false)

    const [taskName, setTaskName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const changeTaskName = (e: ChangeEvent<HTMLInputElement>) => setTaskName(e.currentTarget.value)
    const changeDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setTaskName('')
    }

    const addTask = (title: string, description: string) => {
        setOpen(false)
        setTaskName('')
        setDescription('')
        dispatch(tasksThunk.addTaskName({todolistId: todolistId, title, description}))
    }

    const removeTodolist = () => {
        dispatch(todolistsThunk.removeTodolist(todolistId))
    }

    return (
        <div>
            <div className={s.titleContainer}>
                <DescriptionIcon color={'info'}/>
                <h2>{title}</h2>
            </div>
            <div className={s.todolist}>
                <Task todolistId={todolistId}/>
                {
                    open
                        ?
                        <AddTaskModalWindow
                            taskName={taskName}
                            description={description}
                            handleClose={handleClose}
                            changeTaskName={changeTaskName}
                            changeDescription={changeDescription}
                            addTask={addTask}
                        />
                        :
                        <ButtonAddTask
                            label={'Add a task'}
                            className={'addTask'}
                            onClick={handleOpen}
                        />
                }
                {/*<ModalWindowAddTodo
                    title={title}
                    open={open}
                    changeTitle={changeTitle}
                    onClick={handleClose}
                    addTask={addTask}
                />*/}
            </div>
        </div>
    )
}