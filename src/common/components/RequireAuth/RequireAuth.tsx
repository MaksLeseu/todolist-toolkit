import React from "react";
import {useAppSelector} from "../../utils/hooks/useAppSelector";
import {isLoggedInSelector} from "../../../features/Auth/auth.selector";
import {Layout} from "../Layout/Layout";
import {Navigate, useLocation} from "react-router-dom";
import {BASE_ROUTE} from "../../../routes/Routes";


export const RequireAuth = () => {
    const isLoggedIn: boolean = useAppSelector(isLoggedInSelector)
    const location = useLocation();

    return isLoggedIn ? <Layout/> : <Navigate to={`${BASE_ROUTE}/start`} state={{from: location}} replace/>
}
