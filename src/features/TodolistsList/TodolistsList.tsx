import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {todolistsThunk} from "./todolists-slice";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";

export const TodolistsList = () => {
    const todos = useSelector((state: AppRootStateType) => state.todolists)
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(todolistsThunk.getTodolists())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return  (
        <div>
            {
                todos ?
                    todos.map(tl => (
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                        />))
                    :
                    <div>Sorry</div>
            }
        </div>
    )
}