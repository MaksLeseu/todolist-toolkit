import React, {useEffect} from 'react';
import {Todolists} from "../features/Todolists/Todolists";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {Login} from "../features/Auth/Login";
import {BaseMenu} from "../common/components/BaseMenu/BaseMenu";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {authThunk} from "../features/Auth/auth-slice";
import s from './App.module.css'
import {Todolist} from "../features/Todolists/Todolist/Todolist";


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
                    <Route path={'/'} element={<Todolists onClickLink={false} />}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/todo/*'} element={<Todolists onClickLink={true} />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

