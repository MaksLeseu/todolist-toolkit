import React, {FC, MouseEventHandler} from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {CSSObject, styled, Theme, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {CreateTodo} from "./CreateTodo/CreateTodo";
import {TodosList} from "./TodosList/TodosList";
import s from '../Header.module.css'
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {useAppDispatch} from "../../../common/utils/hooks/useAppDispatch";
import {todolistsThunk} from "../../Todolists/todolists.slice";

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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
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

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


type Props = {
    open: boolean
    handleDrawerClose: MouseEventHandler
}

export const BodyMenu: FC<Props> = ({open, handleDrawerClose}) => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)

    const removeTodo = (todolistId: string | undefined) => {
        todolistId && dispatch(todolistsThunk.removeTodolist(todolistId))
    }

    const theme = useTheme();

    return (
        <>
            {
                isLoggedIn &&

                <Drawer variant="permanent" open={open}>
                    <DrawerHeader sx={{backgroundColor: 'rgba(32, 33, 35, 1.00)'}}>
                        <CustomIconButton
                            disableRipple={false}
                            onClick={handleDrawerClose}
                        >
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> :
                                <div className={s.icon}><ChevronLeftIcon/></div>}
                        </CustomIconButton>
                    </DrawerHeader>
                    <Divider sx={{backgroundColor: 'rgb(236, 236, 241)'}}/>
                    <List sx={{backgroundColor: 'rgba(32, 33, 35, 1.00)'}}>
                        <CreateTodo
                            open={open}
                        />
                    </List>
                    <Divider sx={{backgroundColor: 'rgb(236, 236, 241)'}}/>
                    <List sx={{backgroundColor: 'rgba(32, 33, 35, 1.00)', height: '100%'}}>
                        {
                            open &&
                            <List
                                sx={{color: 'rgb(142, 142, 160)', marginLeft: '10px'}}>
                                To-do lists:
                            </List>
                        }
                        <TodosList
                            open={open}
                            removeTodo={removeTodo}
                        />
                    </List>
                </Drawer>
            }
        </>
    )
}