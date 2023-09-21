import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {TodolistsList} from "./TodolistsList/TodolistsList";
import s from './Todolists.module.css'
import {Todolist} from "./Todolist/Todolist";

type Props = {
    onClickLink: boolean
}

export const Todolists: FC<Props> = ({ onClickLink }) => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const todos = useSelector((state: AppRootStateType) => state.todolists)

    const { todo } = useParams()
    const todolist = todo ? todo : ''

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    const filterTodos = (): JSX.Element => {
        const todo = todos.filter(td => td.id === todolist)
        return <Todolist key={todo[0].id} todolistId={todo[0].id} title={todo[0].title} />
    }

    const returnTodosList = (): JSX.Element[] => todos.map(td => (
        <NavLink to={`/todo/${td.id}`} className={s.todo}>
            <TodolistsList key={td.id} todoTitle={td.title} />
        </NavLink>
    ))

    const returnTodos = (componentName: string) =>
        componentName === 'todo' ? filterTodos() : returnTodosList()

    return  (
        <>
            {
                onClickLink || <p className={s.title}>To-do lists</p>
            }
            <div className={s.todosList}>
                {
                    onClickLink ? returnTodos('todo') : returnTodos('todoList')
                }
            </div>
        </>
    )
}
