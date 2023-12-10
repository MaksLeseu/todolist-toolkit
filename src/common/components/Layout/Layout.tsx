import React, {FC, ReactNode} from "react";
import {Header} from "../../../features/Header/Header";
import {Outlet} from "react-router-dom";
import {ErrorSnackbars} from "../ErrorSnackbars/ErrorSnackbars";
import {Footer} from "../../../features/Footer/Footer";
import s from './Layout.module.css'
import {Main} from "../../utils/functions/dynamicSetMarginForContentPart/dynamicSetMarginForContentPart";

type Props = {
    children?: ReactNode
}

export const Layout: FC<Props> = (props) => {
    const {children} = props

    const [isOpenMenu, setIsOpenMenu] = React.useState(false);
    const changeDrawer = () => setIsOpenMenu(!isOpenMenu)

    return (
        <div className={s.layout}>
            <Header
                isOpen={isOpenMenu}
                changeDrawer={changeDrawer}
            />
            <ErrorSnackbars/>
            <Main open={isOpenMenu}>
                <div className={s.container}>{children ? children : <Outlet/>}</div>
            </Main>
            <Footer/>
        </div>
    )
}