import React from 'react';
import './App.css';
import {TodolistsList} from "./features/TodolistsList/TodolistsList";
import {
    AppBar, Button, IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import {Menu} from "@mui/icons-material";

export const App = () => {
  return (
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
        <TodolistsList />
      </div>
    </div>
  );
}

