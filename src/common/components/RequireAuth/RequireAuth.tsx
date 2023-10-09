import React from "react";
import {useAppSelector} from "../../utils/hooks/useAppSelector";
import {isLoggedInSelector} from "../../../features/Auth/auth.selector";
import {Layout} from "../Layout/Layout";
import {Navigate, useLocation} from "react-router-dom";


export const RequireAuth = () => {
    const isLoggedIn: boolean = useAppSelector(isLoggedInSelector)
    const location = useLocation();

    return isLoggedIn ? <Layout/> : <Navigate to={'/todolist-toolkit/login'} state={{from: location}} replace/>
}
