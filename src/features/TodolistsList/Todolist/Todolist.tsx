import React, {FC, useState} from "react";
import s from './Todolist.module.css'
import {Task} from "./Task/Task";
import {ButtonAddTask} from "./ButtonAddTask";
import {ModalWindow} from "./ModalWindow";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {tasksThunk} from "../tasks-reducer";

type TodolistType = {
    todolistId: string
    title: string
}

export const Todolist: FC<TodolistType> = (props) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addTask = (title: string) => {
        dispatch(tasksThunk.addTask({todolistId: props.todolistId, title}))
    }
    return (
        <div className={s.todolist}>
            <h2>{props.title}</h2>
            <Task todolistId={props.todolistId} />
            <ButtonAddTask onClick={handleOpen} />
            <ModalWindow open={open} onClick={handleClose} addTask={addTask} />
        </div>
    )
}