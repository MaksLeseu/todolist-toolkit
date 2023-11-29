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
import s from './Header.module.css'
import {CustomButton} from "../../common/components/CustomButton/CustomButton";

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
                        <Box sx={{
                            width: '1110px',
                            height: '60px',
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box sx={{width: '101px'}}></Box>
                            <NavLink className={s.title} to={'/todolist-toolkit'}>
                                Today
                            </NavLink>

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

                            {
                                isLoggedIn &&
                                <LogOutButton
                                    handlerLogout={handlerLogout}
                                />
                            }
                        </Box>
                    </div>

                </Toolbar>
            </AppBar>

            {/*<BodyMenu
                isOpen={isOpen}
                handleDrawerClose={changeDrawer}
            />*/}
        </Box>
    );
}