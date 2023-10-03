import React, {FC, ReactNode} from "react";
import {Header} from "../Header/Header";
import {Outlet} from "react-router-dom";

type Props = {
    children?: ReactNode
}

export const Layout: FC<Props> = (props) => {
    const {children} = props
    console.log(!!children)

    return (
        <div>
            <Header/>
            {children ? children : <Outlet/>}
        </div>
    )
}