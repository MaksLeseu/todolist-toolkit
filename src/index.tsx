import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {App} from './app/App';
import {Provider} from "react-redux";
import {store} from "./store/store";

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

const rootElement = document.getElementById('root')
rootElement && rootElement.classList.add('root')

