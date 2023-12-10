import React, {FC, ReactNode} from "react";
import {Header} from "../../../features/Header/Header";
import {Outlet} from "react-router-dom";
import {ErrorSnackbars} from "../ErrorSnackbars/ErrorSnackbars";
import {Footer} from "../../../features/Footer/Footer";
import s from './Layout.module.css'

type Props = {
    children?: ReactNode
}

export const Layout: FC<Props> = (props) => {
    const {children} = props

    return (
        <div className={s.layout}>
            <Header/>
            <ErrorSnackbars/>
            <div className={s.container}>{children ? children : <Outlet/>}</div>
            <Footer/>
        </div>
    )
}