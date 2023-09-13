import React, {useEffect} from 'react';
import './App.css';
import {TodolistsList} from "./features/TodolistsList/TodolistsList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./features/Auth/Login";
import {BaseMenu} from "./app/BaseMenu";
import {useAppDispatch} from "./common/hooks/useAppDispatch";
import {authThunk} from "./features/Auth/auth-slice";

export const App = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authThunk.authMe({}))
    }, [])

    return (
        <BrowserRouter>
            <div className="container">
                <BaseMenu />
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

