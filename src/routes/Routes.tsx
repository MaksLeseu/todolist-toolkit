import {createBrowserRouter, Navigate, NavLink, RouterProvider} from "react-router-dom";
import {Layout} from "../common/components/Layout/Layout";
import {Todolists} from "../features/Todolists/Todolists";
import React from "react";
import {RequireAuth} from "../common/components/RequireAuth/RequireAuth";
import {StartPage} from "../common/components/StartPage/StartPage";
import {Auth} from "../features/Auth/Auth";
import {CreateTodo} from "../common/components/CreateTodo/CreateTodo";

const privateRoutes = [
    {
        path: '/todolist-toolkit',
        element: <Navigate to={'/todolist-toolkit/todo'}/>
    },
    {
        path: '/todolist-toolkit/todo',
        element: <Todolists isTodoListClickable={false}/>
    },
    {
        path: '/todolist-toolkit/todo/:todo/*',
        element: <Todolists isTodoListClickable={true}/>
    },
    {
        path: '/todolist-toolkit/todo/create-todo',
        element: <CreateTodo/>
    }
]

const publicRoutes = [
    {
        path: '/todolist-toolkit/:start',
        element: (
            <Layout>
                <StartPage/>
            </Layout>
        )
    },
    {
        path: '/todolist-toolkit/login',
        element: (
            <Layout>
                <Auth/>
            </Layout>
        )
    },
    {
        path: '*',
        element: <Navigate to={'/todolist-toolkit/404'}/>
    },
    {
        path: '/todolist-toolkit/404',
        element: (
            <div>
                <p>404 - Page is not found!</p>
                <NavLink to={'/todolist-toolkit/todo'}>Go to the main age</NavLink>
            </div>
        )
    }
]

const router = createBrowserRouter([
    {
        element: <RequireAuth/>,
        children: privateRoutes,
    },
    ...publicRoutes,
]);

export const Router = () => {
    return <RouterProvider router={router}/>
}