import React, {FC} from "react";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {CSSObject, styled, Theme, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {CreateTodoButton} from "./CreateTodoButton/CreateTodoButton";
import {TodosList} from "./TodosList/TodosList";

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


type Porps = {
    open: boolean
    handleDrawerClose: () => void
}

export const BodyMenu: FC<Porps> = ({open, handleDrawerClose}) => {
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)

    const theme = useTheme();

    return (
        <>
            {
                isLoggedIn
                    ?
                    <Drawer variant="permanent" open={open}>
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </DrawerHeader>
                        <Divider/>
                        <List>

                            <CreateTodoButton
                                open={open}
                            />

                        </List>
                        <Divider/>
                        <List>

                            <TodosList
                                open={open}
                            />

                        </List>
                    </Drawer>
                    :
                    null
            }
        </>
    )
}