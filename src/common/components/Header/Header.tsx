import React, {useEffect} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Button, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {authThunk} from "../../../features/Auth/auth-slice";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {todolistsThunk} from "../../../features/Todolists/Todolist/todolists.slice";
import {NavLink} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import s from './Header.module.css'
import {Menu} from "../Menu/Menu";
import {LogOutButton} from "../LogOutButton/LogOutButton";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export const Header = () => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const handlerLogout = () => dispatch(authThunk.logout({}))

    const todos = useSelector((state: AppRootStateType) => state.todolists)

    useEffect(() => {
        if (todos.length === 0) {
            dispatch(todolistsThunk.getTodolists())
        }
    }, [])


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', marginBottom: '120px' }}>
            <CssBaseline />
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

            {
                isLoggedIn
                    ?
                    <Drawer variant="permanent" open={open}>
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List>
                            <Tooltip title={'Create to-do list'} placement="right-start" arrow>
                                <ListItem disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {<NoteAddIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={'Create To-do list'} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>

                        </List>
                        <Divider />
                        <List>
                            {todos.map((todo, index) => (
                                <NavLink to={`/todo/${todo.id}`} className={s.todo}>
                                    <Tooltip title={todo.title} placement="right-start" arrow>
                                        <ListItem key={todo.id} disablePadding sx={{ display: 'block' }}>
                                            <ListItemButton
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: open ? 'initial' : 'center',
                                                    px: 2.5,
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {<InsertDriveFileIcon />}
                                                </ListItemIcon>
                                                <ListItemText primary={todo.title} sx={{ opacity: open ? 1 : 0 }} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Tooltip>
                                </NavLink>
                            ))}
                        </List>
                    </Drawer>
                    :
                    null
            }
        </Box>
    );
}