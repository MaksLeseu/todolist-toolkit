import React, {FC, useState} from "react";
import s from './Todolist.module.css'
import {Task} from "./Task/Task";
import {ButtonAddTask} from "./ButtonAddTask";
import {ModalWindow} from "./ModalWindow";

type TodolistType = {
    todolistId: string
    title: string
}

export const Todolist: FC<TodolistType> = (props) => {
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className={s.todolist}>
            <h2>{props.title}</h2>
            <Task todolistId={props.todolistId} />
            <ButtonAddTask onClick={handleOpen} />
            <ModalWindow open={open} onClick={handleClose} />
        </div>
    )
}