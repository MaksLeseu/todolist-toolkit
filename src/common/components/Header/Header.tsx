import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {authThunk} from "../../../features/Auth/auth-slice";
import {todolistsThunk} from "../../../features/Todolists/Todolist/todolists.slice";
import {NavLink} from "react-router-dom";
import {Menu} from "./Menu/Menu";
import {LogOutButton} from "./LogOutButton/LogOutButton";
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
    const todos = useSelector((state: AppRootStateType) => state.todolists)

    useEffect(() => {
        if (todos.length === 0) {
            dispatch(todolistsThunk.getTodolists())
        }
    }, [])

    const handlerLogout = () => dispatch(authThunk.logout({}))

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex', marginBottom: '120px'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>

                    <Menu
                        open={open}
                        handleDrawerOpen={handleDrawerOpen}
                    />

                    <Typography
                        variant={'h6'}
                        component={'div'}
                        sx={{flexGrow: 1}}
                    >
                        <NavLink to={'/'}>
                            <Typography
                                variant={'h6'}
                                component={'div'}
                                sx={{flexGrow: 1, color: 'white', textDecoration: 'none'}}
                            >
                                To-do list
                            </Typography>
                        </NavLink>
                    </Typography>

                    <LogOutButton
                        handlerLogout={handlerLogout}
                    />

                </Toolbar>
            </AppBar>

            <BodyMenu
                open={open}
                handleDrawerClose={handleDrawerClose}
            />
        </Box>
    );
}