import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Layout} from "../common/components/Layout/Layout";
import React from "react";
import {RequireAuth} from "../common/components/RequireAuth/RequireAuth";
import {StartPage} from "../common/components/StartPage/StartPage";
import {Auth} from "../features/Auth/Auth";
import {Page404} from "../common/components/Page404/Page404";
import {Todolists} from "../features/Todolists/Todolists";
import {CreateTodo} from "../common/components/CreateTodo/CreateTodo";

export const BASE_ROUTE = '/today'

/*todolist-toolkit*/

const privateRoutes = [
    {
        path: `/`,
        element: <Navigate to={`${BASE_ROUTE}/todo`}/>
    },
    /*{
        path: `${BASE_ROUTE}`,
        element: <Navigate to={`${BASE_ROUTE}/todo`}/>
    },*/
    {
        path: `${BASE_ROUTE}/todo`,
        element: <Todolists isTodoListClickable={false}/>
    },
    {
        path: `${BASE_ROUTE}/todo/:todo/*`,
        element: <Todolists isTodoListClickable={true}/>
    },
    {
        path: `${BASE_ROUTE}/todo/create-todo`,
        element: <CreateTodo/>
    }
]

const publicRoutes = [
    {
        path: `${BASE_ROUTE}/:start`,
        element: (
            <Layout>
                <StartPage/>
            </Layout>
        )
    },
    {
        path: `${BASE_ROUTE}/login`,
        element: (
            <Layout>
                <Auth/>
            </Layout>
        )
    },
    {
        path: '*',
        element: <Navigate to={'/errorCode'}/>
    },
    {
        path: '/:errorCode',
        element: (
            <Layout>
                <Page404/>
            </Layout>
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