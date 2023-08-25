import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "../../app/store";
import {todolistsThunk} from "./todolists-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";

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
                    todos.map(tl => {
                        return (
                            <div>
                                {tl.title}
                            </div>
                        )
                    })
                    :
                    <div>Sorry</div>
            }
        </div>
    )
}