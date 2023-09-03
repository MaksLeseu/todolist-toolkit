import React, {useEffect} from 'react';
import './App.css';
import {TodolistsList} from "./features/TodolistsList/TodolistsList";
import {
    AppBar, Button, IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppDispatch} from "./common/hooks/useAppDispatch";
import {authThunk} from "./features/Auth/auth-slice";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./features/Auth/Login";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./app/store";

export const App = () => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authThunk.authMe({}))
    }, [])

    const handlerLogout = () => dispatch(authThunk.logout({}))

    return (
        <BrowserRouter>
            <div className="container">
                <AppBar position={'static'} sx={{marginBottom: '40px'}}>
                    <Toolbar>
                        <IconButton
                            size={'large'}
                            edge={'start'}
                            color={'inherit'}
                            aria-label={'menu'}
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography
                            variant={'h6'}
                            component={'div'}
                            sx={{flexGrow: 1}}
                        >
                            Todolist
                        </Typography>
                        {
                            isLoggedIn
                                ?
                                <Button
                                color={'inherit'}
                                onClick={handlerLogout}
                            >
                                Log out
                            </Button>
                                :
                            null
                        }
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

