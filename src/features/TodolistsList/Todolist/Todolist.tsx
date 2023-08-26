import React, {FC, useEffect} from "react";
import s from './Todolist.module.css'
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {tasksThunk} from "../tasks-reducer";

type TodolistType = {
    todolistId: string
    title: string
}

export const Todolist: FC<TodolistType> = (props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(tasksThunk.getTasks({ todolistId: props.todolistId }))
    }, [])

    return (
        <div className={s.container}>
            <h2>{props.title}</h2>
            <div></div>
        </div>
    )
}