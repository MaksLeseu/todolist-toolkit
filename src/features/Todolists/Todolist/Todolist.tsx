import React, {ChangeEvent, FC, useState} from "react";
import s from './Todolist.module.css'
import {Task} from "../../Tasks/Task";
import {ButtonAddTask} from "../../Tasks/ButtonAddTask/ButtonAddTask";
import {ModalWindow} from "../../../common/components/ModalWindow/ModalWindow";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {tasksThunk} from "../../Tasks/tasks.slice";
import DescriptionIcon from '@mui/icons-material/Description';
import {todolistsThunk} from "./todolists.slice";
import {AddTaskModalWindow} from "../../Tasks/AddTaskModalWindow/AddTaskModalWindow";

type TodolistType = {
    todolistId: string
    title: string
}

export const Todolist: FC<TodolistType> = (props) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>(false)
    const [title, setTitle] = useState('')

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setTitle('')
    }

    const addTask = (title: string) => {
        setOpen(false)
        setTitle('')
        dispatch(tasksThunk.addTask({todolistId: props.todolistId, title}))
    }

    const removeTodolist = () => {
        dispatch(todolistsThunk.removeTodolist(props.todolistId))
    }
    return (
        <div>
            <div className={s.titleContainer}>
                <DescriptionIcon color={'info'}/>
                <h2>{props.title}</h2>
            </div>
            <div className={s.todolist}>
                <Task todolistId={props.todolistId}/>
                <ButtonAddTask
                    label={'Add a task'}
                    className={'addTask'}
                    onClick={handleOpen}
                />
                <AddTaskModalWindow/>
                <ModalWindow
                    title={title}
                    open={open}
                    changeTitle={changeTitle}
                    onClick={handleClose}
                    addTask={addTask}
                />
            </div>
        </div>
    )
}