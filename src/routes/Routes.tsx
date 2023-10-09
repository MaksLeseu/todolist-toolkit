import {createBrowserRouter, Navigate, NavLink, RouterProvider} from "react-router-dom";
import {Auth} from "../features/Auth/Auth";
import {Layout} from "../common/components/Layout/Layout";
import {Todolists} from "../features/Todolists/Todolists";
import React from "react";
import {RequireAuth} from "../common/components/RequireAuth/RequireAuth";

const privateRoutes = [
    {
        path: '/todolist-toolkit',
        element: <Navigate to={'/todolist-toolkit/todo'}/>
    },
    {
        path: '/todolist-toolkit/todo',
        element: <Todolists onClickLink={false}/>
    },
    {
        path: '/todolist-toolkit/todo/:todo/*',
        element: <Todolists onClickLink={true}/>
    }
]

const publicRoutes = [
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