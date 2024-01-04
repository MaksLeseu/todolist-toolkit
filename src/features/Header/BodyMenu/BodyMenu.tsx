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


type Props = {
    isOpen: boolean
    handleDrawerClose: () => void
}

export const BodyMenu: FC<Props> = (props) => {
    const {isOpen, handleDrawerClose} = props
    const todos: TodolistsType[] = useAppSelector(todolistsSelector)

    const param = useParams()

    const [isOpenTodoModalWindow, setIsOpenTodoModalWindow] = useState<boolean>(false)

    const openOrCloseTodoModalWindow = () => setIsOpenTodoModalWindow(!isOpenTodoModalWindow)

    const matches = useMediaQuery('(min-width:600px)');

    const dispatch = useAppDispatch()
    const handlerLogout = () => dispatch(authThunk.logout({}))

    const [isOpenConformation, setIsOpenConformation] = useState<HTMLButtonElement | null>(null)
    const closeConformation = () => setIsOpenConformation(null)
    const openConformation = (event: React.MouseEvent<HTMLButtonElement>) => setIsOpenConformation(event.currentTarget)


    const [isOpenMoreHoriz, setIsOpenMoreHoriz] = useState<HTMLButtonElement | null>(null)
    const closeMoreHoriz = () => setIsOpenMoreHoriz(null)
    const openMoreHoriz = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenMoreHoriz(event.currentTarget)
        event.preventDefault()
    }

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const removeTodo = (todoId: string) => {
        setIsLoading(true)
        dispatch(todolistsThunk.removeTodolist(todoId))
            .finally(() => setIsLoading(false))
        closeMoreHoriz()
    }

    return (
        <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                    width: 420,
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1300,
                    boxSizing: 'border-box',
                    padding: '18px 18px 18px 165px',
                    background: 'linear-gradient(186deg, #48289B -0.63%, rgba(82, 28, 225, 0.60) 58.84%, #412589 83.63%)',
                },
                '@media (max-width: 1180px)': {
                    '& .MuiDrawer-paper': {
                        width: 350,
                        padding: '18px 18px 18px 95px',
                    }
                },
                '@media (max-width: 1030px)': {
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'white'
                    }
                },
                '@media (max-width: 800px)': {
                    '& .MuiDrawer-paper': {
                        width: 250,
                        padding: '18px 18px 18px 18px',
                    }
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
                <NavLink className={s.link} to={'/todolist-toolkit/todo/create-todo'}>
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
                </NavLink>
            </Box>
            {
                todos &&
                <Box sx={{
                    flexGrow: 1, overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '10px',
                        backgroundColor: '#704ECC',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        height: '250px',
                        backgroundColor: '#EFE3FF',
                        borderRadius: '100px',
                    }
                }}>
                    {
                        todos.map((todo, index) => (
                                <NavLink to={`/todolist-toolkit/todo/${todo.id}`} key={index}
                                         className={({isActive, isPending}) =>
                                             isPending ? s.pending : isActive ? s.active : s.general
                                         }>
                                    {param.todo === todo.id && <CustomLinearProgress visible={isLoading}/>}
                                    <CustomTooltip
                                        title={todo.title}
                                        bigTextWidth={todo.title.slice(0, 10).length === 10}
                                        notActiveBox={param.todo !== todo.id}
                                    >
                                        <CustomIconButton
                                            disableRipple={param.todo === todo.id}
                                            sx={{
                                                width: '190px',
                                                height: '52px',
                                                borderRadius: '4px',
                                                padding: '12px 8px 12px 8px',
                                                color: param.todo === todo.id ? 'secondary.main' : 'common.white',
                                                fontSize: '22px',
                                                fontStyle: 'normal',
                                                fontWeight: 500,
                                                lineHeight: '28px',
                                                marginBottom: '8px',
                                                position: 'relative',
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
                                                        width: '110px',
                                                        textAlign: 'start',
                                                    }}
                                                >
                                                    {todo.title}
                                                </Box>
                                                {
                                                    param.todo === todo.id &&
                                                    <CustomIconButton
                                                        disableRipple={false}
                                                        sx={{
                                                            alignSelf: 'center',
                                                            width: '24px',
                                                            height: '24px',
                                                            objectFit: 'cover',
                                                            borderRadius: '2px',
                                                        }}
                                                        onClick={openMoreHoriz}
                                                    >
                                                        <Box sx={{
                                                            width: '24px',
                                                            height: '24px', objectFit: 'cover'
                                                        }}>
                                                            <MoreHorizIcon/>
                                                        </Box>
                                                    </CustomIconButton>
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
                <CustomSwitch/>
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
                            color: 'common.white',
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
