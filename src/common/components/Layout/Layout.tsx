import React, {FC, ReactNode} from "react";
import {Header} from "../../../features/Header/Header";
import {Outlet} from "react-router-dom";
import {ErrorSnackbars} from "../ErrorSnackbars/ErrorSnackbars";
import {Footer} from "../../../features/Footer/Footer";
import s from './Layout.module.css'
import {useAppSelector} from "../../utils/hooks/useAppSelector";
import {isLoggedInSelector} from "../../../features/Auth/auth.selector";

type Props = {
    children?: ReactNode
}

export const Layout: FC<Props> = (props) => {
    const {children} = props
    const isLoggedIn: boolean = useAppSelector(isLoggedInSelector)

    return (
        <div className={s.layout}>
            <Header/>
            <ErrorSnackbars/>
            <div className={isLoggedIn ? s.container : s.secondContainer}>{children ? children : <Outlet/>}</div>
            <Footer/>
        </div>
    )
}