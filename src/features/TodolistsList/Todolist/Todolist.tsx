import React, {FC} from "react";
import s from './Todolist.module.css'

type TodolistType = {
    title: string
}

export const Todolist: FC<TodolistType> = (props) => {
    return (
        <div className={s.container}>
            <h2>{props.title}</h2>
            <div></div>
        </div>
    )
}