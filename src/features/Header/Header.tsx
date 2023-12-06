import React, {FC, useState} from 'react';
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
import {ConfirmationModalWindow} from "../../common/components/СonfirmationModalWindow/СonfirmationModalWindow";
import {useMediaQuery} from "@mui/material";

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

type Props = {
    isOpen: boolean
    changeDrawer: () => void
}

const logOutButtonStyles = {
    width: '109px',
    height: '36px',
    display: 'flex',
    justifySelf: 'end',
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: '16px',
    fontStyle: 'normal',
    color: '#704ECC',
    borderRadius: '4px',
    alignSelf: 'center',
    '@media (max-width: 1200px)': {
        justifySelf: 'center',
    },
}

const activeLogOutButtonStyles = {
    width: '109px',
    height: '36px',
    display: 'flex',
    justifySelf: 'end',
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: '16px',
    fontStyle: 'normal',
    color: 'common.white',
    borderRadius: '4px',
    alignSelf: 'center',
    backgroundColor: 'secondary.main',
    '@media (max-width: 1200px)': {
        justifySelf: 'center',
    },
}

export const Header: FC<Props> = (props) => {
    const {isOpen, changeDrawer} = props

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)

    const handlerLogout = () => dispatch(authThunk.logout({}))


    const [isOpenConformation, setIsOpenConformation] = useState<HTMLButtonElement | null>(null)
    const closeConformation = () => setIsOpenConformation(null)
    const openConformation = (event: React.MouseEvent<HTMLButtonElement>) => setIsOpenConformation(event.currentTarget)

    const matches = useMediaQuery('(min-width:600px)');

    const {start} = useParams()

    return (
        <Box sx={{
            marginBottom: '110px', zIndex: 1000,
            '@media (max-width: 850px)': {
                marginBottom: '50px'
            },
        }}>
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
                    boxShadow: '0',
                }}
                open={isOpen}
            >
                <Toolbar>
                    <div className={s.headerContainer}>
                        {
                            isLoggedIn &&
                            <Menu
                                sx={{
                                    width: '35px',
                                    height: '35px',
                                    alignSelf: 'center',
                                    ...(isOpen && {display: 'none'}),
                                    '@media (max-width: 1200px)': {
                                        justifySelf: 'center',
                                    },
                                    '@media (max-width: 600px)': {
                                        marginTop: '8px'
                                    },
                                }}
                                handleDrawerOpen={changeDrawer}
                            />
                        }

                        <NavLink className={s.title} to={'/todolist-toolkit'}>
                            {
                                !isOpen && matches && 'Today'
                            }
                        </NavLink>
                        {
                            isLoggedIn && matches &&
                            <LogOutButton
                                sx={isOpenConformation ? activeLogOutButtonStyles : logOutButtonStyles}
                                colorIcon={isOpenConformation ? 'white' : '#704ECC'}
                                handlerLogout={openConformation}
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
            <ConfirmationModalWindow
                isOpen={isOpenConformation}
                title={'Are you sure you want to sign out?'}
                actionConfirmation={handlerLogout}
                closeConfirmation={closeConformation}
            />
        </Box>
    );
}

