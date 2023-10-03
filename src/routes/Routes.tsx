import {createBrowserRouter, Navigate, NavLink, RouterProvider} from "react-router-dom";
import {Auth} from "../features/Auth/Auth";
import {Layout} from "../common/components/Layout/Layout";
import {Todolists} from "../features/Todolists/Todolists";
import React from "react";
import {RequireAuth} from "../common/components/RequireAuth/RequireAuth";

const privateRoutes = [
    {
        path: '/',
        element: <Navigate to={'todo'}/>
    },
    {
        path: '/todo',
        element: <Todolists onClickLink={false}/>
    },
    {
        path: '/todo/:todo/*',
        element: <Todolists onClickLink={true}/>
    }
]

const publicRoutes = [
    {
        path: '/login',
        element: (
            <Layout>
                <Auth/>
            </Layout>
        )
    },
    {
        path: '*',
        element: <Navigate to={'/404'}/>
    },
    {
        path: '/404',
        element: (
            <div>
                <p>404 - Page is not found!</p>
                <NavLink to={'/todo'}>Go to the main age</NavLink>
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