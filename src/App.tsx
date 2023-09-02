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

export const App = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(authThunk.authMe({}))
    }, [])
  return (
      <BrowserRouter>
          <div className="App">
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
                              <Menu />
                          </IconButton>
                          <Typography
                              variant={'h6'}
                              component={'div'}
                              sx={{flexGrow: 1}}
                          >
                              Todolist
                          </Typography>
                          <Button color={'inherit'}>Login</Button>
                      </Toolbar>
                  </AppBar>
                  <Routes>
                      <Route path={'/'} element={<TodolistsList/>}/>
                      <Route path={'/login'} element={<Login />} />
                  </Routes>
              </div>
          </div>
      </BrowserRouter>
  );
}

