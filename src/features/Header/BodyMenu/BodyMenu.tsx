import React, {FC, useState} from "react";
import Box from '@mui/material/Box';
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {PlusIcon} from "../../../common/components/Icons/PlusIcon";
import {common} from "@mui/material/colors";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import Drawer from '@mui/material/Drawer';
import {TodolistsType} from "../../Todolists/todolists.types";
import {useAppSelector} from "../../../common/utils/hooks/useAppSelector";
import {todolistsSelector} from "../../Todolists/todolists.selector";
import {MoreHorizIcon} from "../../../common/components/Icons/MoreHorizIcon";
import {DocumentIcon} from "../../../common/components/Icons/DocumentIcon";
import {ArrowIcon} from "../../../common/components/Icons/ArrowIcon";


type Props = {
    isOpen: boolean
    handleDrawerClose: () => void
}

export const BodyMenu: FC<Props> = (props) => {
    const {isOpen, handleDrawerClose} = props
    const todos: TodolistsType[] = useAppSelector(todolistsSelector)

    const [isOpenTodoModalWindow, setIsOpenTodoModalWindow] = useState<boolean>(false)

    const openOrCloseTodoModalWindow = () => setIsOpenTodoModalWindow(!isOpenTodoModalWindow)

    return (
        <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                    width: 420,
                    zIndex: 1300,
                    boxSizing: 'border-box',
                    padding: '18px 18px 18px 165px',
                    background: 'linear-gradient(186deg, #48289B -0.63%, rgba(82, 28, 225, 0.60) 58.84%, #412589 83.63%)',
                },
            }}
            variant="persistent"
            anchor="left"
            open={isOpen}
        >
            <Box sx={{marginBottom: '72px'}}>
                <CustomButton
                    label={'Today'}
                    variant={'text'}
                    iconFromTheEnd={<Box sx={{marginLeft: '4px', width: '24px', height: '24px'}}><ArrowIcon/></Box>}
                    sx={{
                        color: common.white,
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '24px',
                        textTransform: 'uppercase',
                        marginLeft: '30px'
                    }}
                    onClick={handleDrawerClose}
                />
            </Box>
            <Box sx={{marginBottom: '50px'}}>
                <CustomIconButton
                    disableRipple={false}
                    sx={{
                        width: '162px',
                        height: '56px',
                        borderRadius: '8px',
                        backgroundColor: '#F81',
                        color: common.white,
                        fontSize: '22px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: '24px',
                        '&:hover': {
                            backgroundColor: 'common.black',
                        }
                    }}
                    onClick={openOrCloseTodoModalWindow}
                >
                    <><Box sx={{marginRight: '8px'}}>Create</Box> <PlusIcon/></>
                </CustomIconButton>
            </Box>
            {
                todos &&
                <Box>
                    {
                        todos.map(el => (
                                <CustomIconButton
                                    disableRipple={false}
                                    sx={{
                                        width: '190px',
                                        height: '52px',
                                        borderRadius: '4px',
                                        padding: '12px 0px 12px 0px',
                                        color: 'common.white',
                                        fontSize: '22px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: '28px',
                                        marginBottom: '8px',
                                    }}
                                    onClick={() => {
                                    }}
                                >
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                    }}>
                                        <Box sx={{alignSelf: 'center'}}><DocumentIcon/></Box>
                                        <Box sx={{alignSelf: 'center'}}>{el.title}</Box>
                                        <CustomIconButton
                                            disableRipple={true}
                                            onClick={() => {
                                            }}
                                        >
                                            <MoreHorizIcon/>
                                        </CustomIconButton>
                                    </Box>
                                </CustomIconButton>
                            )
                        )
                    }
                </Box>
            }
        </Drawer>
    );
}


/*
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
    isOpen: boolean
    handleDrawerClose: MouseEventHandler
}

export const BodyMenu: FC<Props> = ({isOpen, handleDrawerClose}) => {
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

                <Drawer variant="permanent" open={isOpen}>
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
                            open={isOpen}
                        />
                    </List>
                    <Divider sx={{backgroundColor: 'rgb(236, 236, 241)'}}/>
                    <List sx={{backgroundColor: 'rgba(32, 33, 35, 1.00)', height: '100%'}}>
                        {
                            isOpen &&
                            <List
                                sx={{color: 'rgb(142, 142, 160)', marginLeft: '10px'}}>
                                To-do lists:
                            </List>
                        }
                        <TodosList
                            open={isOpen}
                            removeTodo={removeTodo}
                        />
                    </List>
                </Drawer>
            }
        </>
    )
}*/
/*import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

type Props = {
    isOpen: boolean
    handleDrawerClose: () => void
    window?: () => Window;
}

export const BodyMenu: FC<Props> = (props) => {
    const {isOpen, handleDrawerClose, window} = props;

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                {/!* The implementation can be swapped with js to avoid SEO duplication of links. *!/}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={true}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}*/
// type Props = {
//     isOpen: boolean
//     handleDrawerClose: () => void
// }
//
// export const BodyMenu: FC<Props> = (props) => {
//     const {isOpen, handleDrawerClose} = props
//
//     return (
//         <>
//             {
//                 isOpen &&
//                 <Box
//                     sx={{
//                         width: '420px',
//                         height: '100%',
//                         backgroundColor: 'red',
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                     }}
//                 >
//
//                 </Box>
//             }
//         </>
//     )
// }
