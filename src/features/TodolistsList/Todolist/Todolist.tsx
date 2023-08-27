import React, {FC} from "react";
import s from './Todolist.module.css'
import {Task} from "./Task/Task";

type TodolistType = {
    todolistId: string
    title: string
}

export const Todolist: FC<TodolistType> = (props) => {
    return (
        <div className={s.container}>
            <h2>{props.title}</h2>
            <Task todolistId={props.todolistId} />
        </div>
    )
}