import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Navigate, NavLink} from "react-router-dom";
import {TodolistsList} from "./TodolistsList/TodolistsList";
import s from './Todolists.module.css'
import {Todolist} from "./Todolist/Todolist";

type Props = {
    onClickLink: boolean
}

export const Todolists: FC<Props> = ({ onClickLink }) => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const todos = useSelector((state: AppRootStateType) => state.todolists)

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    const returnTodos = (componentName: string): JSX.Element[] => {
        return (
            todos.map(td => {
                return componentName === 'todo'
                    ?
                    <Todolist todolistId={td.id} title={td.title} />
                    :
                    <NavLink to={`/todo/${td.title}/${td.id}`} className={s.todo}>
                        <TodolistsList todoTitle={td.title} />
                    </NavLink>
            })
        )
    }

    return  (
        <>
            {onClickLink || <p className={s.title}>To-do lists</p>}
            <div className={s.todosList}>
                {
                    onClickLink ? returnTodos('todo') : returnTodos('todoList')
                }
            </div>
        </>
    )
}

/*
{
    todos.map(td => (
        <NavLink to={`/todo/${td.title}/${td.id}`} className={s.todo}>
            <TodolistsList todoTitle={td.title} />
        </NavLink>
    ))
}*/
