import React, {FC, ReactNode} from "react";
import {Header} from "../../../features/Header/Header";
import {Outlet} from "react-router-dom";

type Props = {
    children?: ReactNode
}

export const Layout: FC<Props> = (props) => {
    const {children} = props

    return (
        <div>
            <Header/>
            {children ? children : <Outlet/>}
        </div>
    )
}