import React from 'react';
import './App.css';
import {TodolistsList} from "./features/TodolistsList/TodolistsList";

export const App = () => {
  return (
    <div className="App">
      <div className="container">
        <TodolistsList />
      </div>
    </div>
  );
}

