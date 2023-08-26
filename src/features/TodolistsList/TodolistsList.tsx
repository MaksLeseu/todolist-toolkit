import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {todolistsThunk} from "./todolists-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(todolistsThunk.getTodolists())
    }, [])
    const todos = useSelector((state: AppRootStateType) => state.todolists)
    return  (
        <div>
            {
                todos ?
                    todos.map(tl => (
                        <Todolist
                            key={tl.id}
                            title={tl.title}
                        />))
                    :
                    <div>Sorry</div>
            }
        </div>
    )
}