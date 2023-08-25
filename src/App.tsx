import React from 'react';
import './App.css';
import {TodolistsList} from "./features/TodolistsList/TodolistsList";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TodolistsList />
      </header>
    </div>
  );
}

