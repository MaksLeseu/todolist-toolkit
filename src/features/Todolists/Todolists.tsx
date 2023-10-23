import React, {FC} from "react";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {HomePageTodos} from "./HomePageTodos/HomePageTodos";
import s from './Todolists.module.css'
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {todolistsSelector} from "./todolists.selector";
import {TodolistsType} from "./todolists.types";

type Props = {
    onClickLink: boolean
}

export const Todolists: FC<Props> = ({onClickLink}) => {

    const todos: TodolistsType[] = useAppSelector(todolistsSelector)

    const {todo} = useParams()
    const todolist = todo ? todo : ''

    const filterTodos = (): JSX.Element => {
        const todo = todos.filter(td => td.id === todolist)

        if (todo.length <= 0) {
            return <Navigate to={'/todolist-toolkit'}/>
        } else {
            return <Todolist key={todo[0].id} todolistId={todo[0].id} todolistTitle={todo[0].title} todolist={todo[0]}/>
        }
    }

    const returnTodosList = (): JSX.Element[] => todos.map(td => (
        <NavLink to={`/todolist-toolkit/todo/${td.id}`} key={td.id} className={s.todo}>
            <HomePageTodos key={td.id} todoTitle={td.title}/>
        </NavLink>
    ))

    const returnTodos = (componentName: string) =>
        componentName === 'todo' ? filterTodos() : returnTodosList()

    return (
        <div className={s.todolists}>
            {
                onClickLink || <p className={s.title}>To-do lists</p>
            }
            <div className={s.todosList}>
                {
                    onClickLink ? returnTodos('todo') : returnTodos('todoList')
                }
            </div>
        </div>
    )
}
