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
import {DocumentIcon} from "../../../common/components/Icons/DocumentIcon";
import {ArrowIcon} from "../../../common/components/Icons/ArrowIcon";
import {CustomSwitch} from "../../../common/components/CustomSwitch/CustomSwitch";
import {LogOutButton} from "../LogOutButton/LogOutButton";
import {useMediaQuery} from "@mui/material";
import {ConfirmationModalWindow} from "../../../common/components/СonfirmationModalWindow/СonfirmationModalWindow";
import {useAppDispatch} from "../../../common/utils/hooks/useAppDispatch";
import {authThunk} from "../../Auth/auth.slice";
import {NavLink, useParams} from "react-router-dom";
import s from './BodyMenu.module.css'
import {MoreHoriz} from "../../../common/components/MoreHoriz/MoreHoriz";
import {todolistsThunk} from "../../Todolists/todolists.slice";
import {CustomTooltip} from "../../../common/components/CustomTooltip/CustomTooltip";
import {CustomLinearProgress} from "../../../common/components/CustomLinearProgress/CustomLinearProgress";
import {appActions} from "../../../app/app.slice";
import {BASE_ROUTE} from "../../../routes/Routes";
import {MoreHorizIcon} from "../../../common/components/Icons/MoreHorizIcon";
import {Nullable} from "../../../common/utils/types/optional.types";
import {MSG_BTN} from "../../../common/utils/constans/app-messages.const";


type Props = {
    isOpen: boolean
    handleDrawerClose: (type: 'open' | 'close') => void
}

export const BodyMenu: FC<Props> = (props) => {
    const {isOpen, handleDrawerClose} = props
    const dispatch = useAppDispatch()
    const todos: TodolistsType[] = useAppSelector(todolistsSelector)

    const param = useParams()

    const [isOpenTodoModalWindow, setIsOpenTodoModalWindow] = useState<boolean>(false)

    const openOrCloseTodoModalWindow = () => setIsOpenTodoModalWindow(!isOpenTodoModalWindow)

    const matches = useMediaQuery('(min-width:600px)');

    const handlerLogout = () => {
        dispatch(authThunk.logout({}))
            .then(() => {
                dispatch(appActions.setIsOpenMenu({isOpenMenu: false}))
                dispatch(appActions.setMode({mode: 'light'}))
            })
    }

    const [isOpenConformation, setIsOpenConformation] = useState<Nullable<HTMLButtonElement>>(null)
    const closeConformation = () => setIsOpenConformation(null)
    const openConformation = (event: React.MouseEvent<HTMLButtonElement>) => setIsOpenConformation(event.currentTarget)


    const [isOpenMoreHoriz, setIsOpenMoreHoriz] = useState<Nullable<HTMLButtonElement>>(null)
    const closeMoreHoriz = () => setIsOpenMoreHoriz(null)
    const openMoreHoriz = (event: React.MouseEvent) => {
        setIsOpenMoreHoriz(event.currentTarget as HTMLButtonElement)
        event.preventDefault()
    }

    const activeStylesButtonMoreHoriz: Nullable<object> = isOpenMoreHoriz ? {
        transition: 'all 0.3s',
        boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.25) inset, -1px -1px 2px 0px rgba(0, 0, 0, 0.25) inset',
    } : null

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const removeTodo = (todoId: string) => {
        setIsLoading(true)
        dispatch(todolistsThunk.removeTodolist(todoId))
            .finally(() => setIsLoading(false))
        closeMoreHoriz()
    }

    const switchMode = () => {
        if (checked) {
            dispatch(appActions.setMode({mode: 'light'}))
        } else {
            dispatch(appActions.setMode({mode: 'dark'}))
        }
    }

    const [checked, setChecked] = useState<boolean>(false)
    const changeChecked = () => {
        setChecked(!checked)
        switchMode()
    }

    const matches600 = useMediaQuery('(max-width:600px)');

    return (
        <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                    width: 320,
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1300,
                    boxSizing: 'border-box',
                    padding: '18px 18px 18px 18px',
                    background: 'linear-gradient(186deg, #48289B -0.63%, rgba(82, 28, 225, 0.60) 58.84%, #412589 83.63%)',
                    backgroundColor: 'common.white',
                    textAlign: 'center'
                },
                '@media (max-width: 1180px)': {
                    '& .MuiDrawer-paper': {
                        width: 320,
                    }
                },
                '@media (max-width: 1030px)': {
                    '& .MuiDrawer-paper': {}
                },
                '@media (max-width: 800px)': {
                    '& .MuiDrawer-paper': {
                        width: 250,
                    }
                },
            }}
            variant={matches600 ? 'temporary' : 'persistent'}
            anchor="left"
            open={isOpen}
            onClose={() => handleDrawerClose('close')}
        >
            <Box sx={{
                marginBottom: '72px',
                '@media (max-width: 600px)': {
                    marginBottom: '40px',
                },
            }}>
                <CustomButton
                    label={MSG_BTN.TODAY}
                    variant={'text'}
                    iconFromTheEnd={<Box sx={{marginLeft: '4px', width: '24px', height: '24px'}}><ArrowIcon/></Box>}
                    sx={{
                        color: common.white,
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '24px',
                        textTransform: 'uppercase',
                        marginLeft: '30px',
                    }}
                    onClick={() => handleDrawerClose('close')}
                />
            </Box>
            <Box sx={{
                marginBottom: '50px',
                '@media (max-width: 600px)': {
                    marginBottom: '30px',
                },
            }}>
                <NavLink to={`${BASE_ROUTE}/todo/create-todo`}>
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
                            transition: 'all 0.6s',
                            '&:hover': {
                                transition: 'all 0.6s',
                                transform: 'scale(1.05)',
                                backgroundColor: '#F81',
                            }
                        }}
                        onClick={openOrCloseTodoModalWindow}
                    >
                        <><Box sx={{marginRight: '8px'}}>Create</Box> <PlusIcon/></>
                    </CustomIconButton>
                </NavLink>
            </Box>
            {
                todos &&
                <Box sx={{
                    flexGrow: 1, overflow: 'auto', margin: '0 auto', width: '210px',
                    '&::-webkit-scrollbar': {
                        width: '10px',
                        backgroundColor: '#704ECC',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        height: '250px',
                        backgroundColor: '#EFE3FF',
                        borderRadius: '100px',
                    },
                    '@media (max-width: 600px)': {
                        height: '300px',
                    },
                }}>
                    {
                        todos.map((todo, index) => (
                                <NavLink to={`${BASE_ROUTE}/todo/${todo.id}`} key={index}
                                         className={({isActive, isPending}) =>
                                             isPending ? s.pending : isActive ? s.active : s.general
                                         }>
                                    {param.todo === todo.id && <CustomLinearProgress visible={isLoading}/>}
                                    <CustomTooltip
                                        title={todo.title}
                                        bigTextWidth={todo.title.slice(0, 12).length === 12}
                                        notActiveBox={param.todo !== todo.id}
                                    >
                                        <CustomIconButton
                                            disableRipple={param.todo === todo.id}
                                            sx={{
                                                width: '190px',
                                                height: '52px',
                                                borderRadius: '4px',
                                                padding: '12px 8px 12px 8px',
                                                color: param.todo === todo.id ? 'secondary.main' : 'text.secondary',
                                                fontSize: '18px',
                                                fontStyle: 'normal',
                                                fontWeight: 500,
                                                lineHeight: '28px',
                                                position: 'relative',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            <Box sx={{
                                                display: 'grid',
                                                gridTemplateColumns: '30px 120px 24px',
                                            }}>
                                                <Box
                                                    sx={{
                                                        justifySelf: 'start',
                                                        marginTop: '5px'
                                                    }}
                                                >
                                                    <DocumentIcon color={param.todo === todo.id ? '#704ECC' : 'white'}/>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        alignSelf: 'center',
                                                        justifySelf: 'start',
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        width: '130px',
                                                        textAlign: 'start',
                                                    }}
                                                >
                                                    {todo.title}
                                                </Box>
                                                {
                                                    param.todo === todo.id &&
                                                    <Box
                                                        sx={{
                                                            alignSelf: 'center',
                                                            width: '24px',
                                                            height: '24px',
                                                            objectFit: 'cover',
                                                            borderRadius: '2px',
                                                            transition: 'all 0.3s',
                                                            ...activeStylesButtonMoreHoriz
                                                        }}
                                                        onClick={openMoreHoriz}
                                                    >
                                                        <Box sx={{
                                                            width: '24px',
                                                            height: '24px', objectFit: 'cover'
                                                        }}>
                                                            <MoreHorizIcon/>
                                                        </Box>
                                                    </Box>
                                                }
                                            </Box>
                                        </CustomIconButton>
                                    </CustomTooltip>
                                    <MoreHoriz
                                        isOpen={isOpenMoreHoriz}
                                        todoId={todo.id}
                                        todoTitle={todo.title}
                                        setIsLoading={setIsLoading}
                                        actionMoreHoriz={removeTodo}
                                        closeMoreHoriz={closeMoreHoriz}
                                    />
                                </NavLink>
                            )
                        )
                    }
                </Box>
            }
            <Box sx={{minHeight: '80px', '@media (max-width: 800px)': {height: '120px'}}}>
                <CustomSwitch checked={checked} onClick={changeChecked}/>
                {
                    !matches &&
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
                            color: 'text.secondary',
                            borderRadius: '4px',
                            alignSelf: 'center',
                            marginTop: '20px',
                            backgroundColor: '#F81'
                        }}
                        colorIcon={'white'}
                        handlerLogout={openConformation}
                    />
                }
            </Box>
            <ConfirmationModalWindow
                isOpen={isOpenConformation}
                title={'Are you sure you want to sign out?'}
                transformConfirmation={'translate(89%, 60%)'}
                transformPopover={'translate(-8%, -45%)'}
                actionConfirmation={handlerLogout}
                closeConfirmation={closeConformation}
            />
        </Drawer>
    );
}
