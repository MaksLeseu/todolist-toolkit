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
import {NavLink, useParams} from "react-router-dom";
import {Menu} from "./Menu/Menu";
import {LogOutButton} from "./LogOutButton/LogOutButton";
import s from './Header.module.css'
import {CustomButton} from "../../common/components/CustomButton/CustomButton";
import {BodyMenu} from "./BodyMenu/BodyMenu";

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

    const {start} = useParams()

    return (
        <Box sx={{marginBottom: '71px', zIndex: 1000}}>
            <BodyMenu
                isOpen={isOpen}
                handleDrawerClose={changeDrawer}
            />
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: '#EFE3FF',
                    boxShadow: '0'
                }}
                open={isOpen}
            >
                <Toolbar>
                    <div className={s.headerContainer}>
                        {
                            isLoggedIn &&
                            <Menu
                                sx={{
                                    width: '24px',
                                    height: '24px',
                                    alignSelf: 'center',
                                    ...(isOpen && {display: 'none'}),
                                }}
                                handleDrawerOpen={changeDrawer}
                            />
                        }

                        <NavLink className={s.title} to={'/todolist-toolkit'}>
                            {
                                !isOpen && 'Today'
                            }
                        </NavLink>

                        {
                            isLoggedIn &&
                            <LogOutButton
                                sx={{
                                    width: '109px',
                                    height: '36px',
                                    display: 'flex',
                                    justifySelf: 'end',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    lineHeight: '16px',
                                    fontStyle: 'normal',
                                    color: '#704ECC',
                                    borderRadius: 0,
                                    alignSelf: 'center'
                                }}
                                handlerLogout={handlerLogout}
                            />
                        }

                        {
                            start &&
                            <NavLink className={s.link} to={'/todolist-toolkit/login'}>
                                <CustomButton
                                    color={'secondary'}
                                    label={'Sign in'}
                                    variant={'contained'}
                                    sx={{
                                        width: '101px',
                                        height: '36px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontStyle: 'normal',
                                        fontWeight: 700,
                                        lineHeight: '16px',
                                    }}
                                />
                            </NavLink>
                        }
                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

