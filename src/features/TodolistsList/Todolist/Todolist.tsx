import React, {FC} from "react";
import s from './Todolist.module.css'
import {Task} from "./Task/Task";
import {AddTask} from "./AddTask";

type TodolistType = {
    todolistId: string
    title: string
}

export const Todolist: FC<TodolistType> = (props) => {
    return (
        <div className={s.todolist}>
            <h2>{props.title}</h2>
            <Task todolistId={props.todolistId} />
            <AddTask />
        </div>
    )
}