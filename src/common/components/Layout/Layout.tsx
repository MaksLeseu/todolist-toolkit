import React, {FC, ReactNode} from "react";
import {Header} from "../../../features/Header/Header";
import {Outlet} from "react-router-dom";
import {ErrorSnackbars} from "../ErrorSnackbars/ErrorSnackbars";

type Props = {
    children?: ReactNode
}

export const Layout: FC<Props> = (props) => {
    const {children} = props

    return (
        <div>
            <Header/>
            <ErrorSnackbars/>
            {children ? children : <Outlet/>}
        </div>
    )
}