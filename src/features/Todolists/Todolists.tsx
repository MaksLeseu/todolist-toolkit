import React, {FC} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {TodolistsList} from "./TodolistsList/TodolistsList";
import s from './Todolists.module.css'

type Props = {

}

export const Todolists: FC<Props> = ({}) => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const todos = useSelector((state: AppRootStateType) => state.todolists)

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return  (
        <div className={s.todosList}>
            {
                todos.map(td =>
                    <TodolistsList todoTitle={td.title} />
                )
            }
        </div>
    )
}