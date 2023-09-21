import React, {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {todolistsThunk} from "./todolists-slice";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {Todolist} from "./Todolist/Todolist";
import {Navigate, useLocation, useParams} from "react-router-dom";

type TodolistsListPropsType = {
    url?: boolean
}

export const TodolistsList: FC<TodolistsListPropsType> = (props) => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const todos = useSelector((state: AppRootStateType) => state.todolists)

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    /*const location = useLocation();
    const currentUrl = location.pathname;
    const regex = /\/todo\/\w+\/([a-f0-9-]+)/;
    const match = currentUrl.match(regex);
    const todoId = match ? match[1] : null*/

    const allTodos = () => (
        todos ?
            todos.map(tl => (
                <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                />))
            :
            <div>Sorry</div>
    )

    const onlyOneTodo = () => (
        todos ?
            todos.map(tl => {
                if (tl.id === '1') {
                    return (
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                        />
                    )
                } else {
                    return null
                }
            })
            :
            <div>Sorry</div>
    )


    return  (
        <div>
            {
                props.url
                    ?
                    onlyOneTodo()
                    :
                    allTodos()
            }
        </div>
    )
}