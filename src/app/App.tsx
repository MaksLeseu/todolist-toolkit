import React, {useEffect} from 'react';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {Login} from "../features/Auth/Login";
import {BaseMenu} from "./BaseMenu";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {authThunk} from "../features/Auth/auth-slice";
import s from './App.module.css'


export const App = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authThunk.authMe({}))
    }, [])


    return (
        <BrowserRouter>
            <div className={s.container}>
                <BaseMenu />
                <Routes>
                    <Route path={'/'} element={<TodolistsList />}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/todo/*'} element={<TodolistsList />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

