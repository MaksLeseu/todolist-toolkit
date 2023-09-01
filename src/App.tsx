import React from 'react';
import './App.css';
import {TodolistsList} from "./features/TodolistsList/TodolistsList";
import {
    AppBar,
    Container,
    CssBaseline, FormControlLabel,
    FormGroup,
    Grid, IconButton,
    Toolbar,
    Typography,
} from "@mui/material";

export const App = () => {
  return (
    <div className="App">
      <div className="container">
          <AppBar position={'static'} sx={{marginBottom: '40px'}}>
              <Toolbar>
                  <Typography
                      variant={'h6'}
                      component={'div'}
                      sx={{flexGrow: 1}}
                  >
                      Todolist
                  </Typography>
              </Toolbar>
          </AppBar>
        <TodolistsList />
      </div>
    </div>
  );
}

