import React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {useAppDispatch} from "../../common/utils/hooks/useAppDispatch";
import {authThunk} from "../Auth/auth.slice";
import {NavLink} from "react-router-dom";
import {Menu} from "./Menu/Menu";
import {LogOutButton} from "./LogOutButton/LogOutButton";
import {BodyMenu} from "./BodyMenu/BodyMenu";
import s from './Header.module.css'

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const Header = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)

    const handlerLogout = () => dispatch(authThunk.logout({}))

    const [isOpen, setIsOpen] = React.useState(false);

    const changeDrawer = () => setIsOpen(!isOpen)

    return (
        <Box sx={{display: 'flex', marginBottom: '71px'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{backgroundColor: '#EFE3FF', height: '60px', boxShadow: '0'}} open={isOpen}>
                <Toolbar>
                    {
                        isLoggedIn &&
                        <Menu
                            sx={{
                                marginRight: 5,
                                ...(isOpen && {display: 'none'}),
                            }}
                            handleDrawerOpen={changeDrawer}
                        />
                    }

                    <div className={s.headerContainer}>
                        <NavLink className={s.title} to={'/todolist-toolkit'}>
                            Today
                        </NavLink>

                        {
                            isLoggedIn &&
                            <LogOutButton
                                handlerLogout={handlerLogout}
                            />
                        }
                    </div>

                </Toolbar>
            </AppBar>

            <BodyMenu
                isOpen={isOpen}
                handleDrawerClose={changeDrawer}
            />
        </Box>
    );
}