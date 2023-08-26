import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {todolistsThunk} from "./todolists-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {Todolist} from "./Todolist/Todolist";
import {tasksThunk} from "./tasks-reducer";

export const TodolistsList = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(todolistsThunk.getTodolists())
        dispatch(tasksThunk.getTasks({todolistId: '68ccd884-5cd8-452f-9ca8-bc4e6fac91c1'}))
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