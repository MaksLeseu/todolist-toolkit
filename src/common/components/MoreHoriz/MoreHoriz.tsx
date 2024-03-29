import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import Box from "@mui/material/Box";
import {TriangleIcon} from "../Icons/TriangleIcon";
import {CustomButton} from "../CustomButton/CustomButton";
import {DeleteIcon} from "../Icons/DeleteIcon";
import {EditIcon} from "../Icons/EditIcon";
import {ConfirmationModalWindow} from "../СonfirmationModalWindow/СonfirmationModalWindow";
import {Edit} from "../Edit/Edit";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../utils/hooks/useAppDispatch";
import {todolistsThunk} from "../../../features/Todolists/todolists.slice";
import {useMediaQuery} from "@mui/material";
import {Nullable} from "../../utils/types/optional.types";
import {MSG_BTN} from "../../utils/constans/app-messages.const";

type Props = {
    isOpen: AnchorElType
    todoId?: string
    taskId?: string
    todoTitle?: string
    setIsLoading?: (value: boolean) => void
    transformPopover?: string
    transformMoreHoriz?: string
    actionMoreHoriz: any
    secondActionMoreHoriz?: () => void
    closeMoreHoriz: () => void
}

const buttonStyles = {
    width: '70px',
    height: '24px',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '16px',
    color: 'secondary.main',
    padding: '4px 8px 4px 8px',
    borderRadius: '2px',
    transition: 'all 0.6s',
    '&:hover': {
        transition: 'all 0.6s',
        backgroundColor: 'secondary.main',
        color: 'text.secondary',
        '& svg path': {
            fill: '#EFE3FF',
        },
    },
    '@media (max-width: 1024px)': {
        transition: 'none',
        '&:hover': {
            transition: 'none',
        }
    }
}

export const MoreHoriz: FC<Props> = (props) => {
    const {
        isOpen,
        todoId,
        taskId,
        todoTitle,
        setIsLoading,
        transformPopover,
        transformMoreHoriz,
        actionMoreHoriz,
        secondActionMoreHoriz,
        closeMoreHoriz
    } = props
    const param = useParams()
    const dispatch = useAppDispatch()

    const [todoName, setTodoName] = useState<string>('')
    const changeTodoName = (e: ChangeEvent<HTMLInputElement>): void => setTodoName(e.currentTarget.value)

    useEffect(() => {
        todoTitle && setTodoName(todoTitle)
    }, [todoTitle])

    const [isOpenConformation, setIsOpenConformation] = useState<Nullable<HTMLButtonElement>>(null)
    const closeConformation = () => setIsOpenConformation(null)
    const openConformation = (event: React.MouseEvent<HTMLButtonElement>) => setIsOpenConformation(event.currentTarget)

    const [isOpenEdit, setIsOpenEdit] = useState<Nullable<HTMLButtonElement>>(null)
    const closeEdit = () => {
        setIsOpenEdit(null)
        todoTitle && setTodoName(todoTitle)
    }
    const openEdit = (event: React.MouseEvent<HTMLButtonElement>) => setIsOpenEdit(event.currentTarget)

    const changeTodo = () => {
        if (todoName !== todoTitle && todoId && setIsLoading) {
            setIsLoading(true)
            dispatch(todolistsThunk.updateTodolist({todolistId: todoId, title: todoName}))
                .then(() => {
                    setIsOpenEdit(null)
                })
                .finally(() => setIsLoading(false))
        }
    }

    const setActiveStyles = (params: 'edit' | 'delete') => {
        const activeStyles = {
            backgroundColor: 'secondary.main',
            color: 'text.secondary',
            '& svg path': {
                fill: '#EFE3FF',
            },
        }

        const methodForSetStyles = {
            ['edit']: () => isOpenEdit ? activeStyles : null,
            ['delete']: () => isOpenConformation ? activeStyles : null,
        }

        return methodForSetStyles[params]()
    }

    const activeStylesButtonEdit: Nullable<object> = setActiveStyles('edit')
    const activeStylesButtonDelete: Nullable<object> = setActiveStyles('delete')

    const matches1130 = useMediaQuery('(max-width:1130px)');

    const returnPopover = () => (
        <CustomPopover
            anchorEl={isOpen}
            listItemStyles={{background: 'none',}}
            transformStyle={transformPopover ? transformPopover : 'translate(-0%, -2%)'}
            handleClosePopover={closeMoreHoriz}
        >
            <>
                <Box sx={{
                    transform: transformMoreHoriz ? transformMoreHoriz : 'translate(4%, 28%)',
                }}>
                    <TriangleIcon/>
                </Box>
                <Box sx={{
                    backgroundColor: 'primary.main',
                    width: '95px',
                    height: '82px',
                    borderRadius: '4px',
                    padding: '12px 14px 13px 11px',
                }}>
                    <CustomButton
                        label={MSG_BTN.EDIT}
                        variant={'text'}
                        sx={{
                            ...buttonStyles,
                            ...activeStylesButtonEdit,
                            margin: '0 auto',
                        }}
                        icon={<Box
                            sx={{
                                marginTop: '4px',
                                transform: 'translate(-5px, 0)'
                            }}><EditIcon/></Box>}
                        onClick={secondActionMoreHoriz ? secondActionMoreHoriz : openEdit}
                    />
                    {
                        <Box sx={{
                            width: '65px',
                            height: '1px',
                            backgroundColor: 'secondary.main',
                            marginTop: '4px',
                            marginBottom: '4px',

                        }}></Box>
                    }
                    <CustomButton
                        label={MSG_BTN.DELETE}
                        variant={'text'}
                        sx={{
                            ...buttonStyles,
                            ...activeStylesButtonDelete,
                        }}
                        icon={<Box sx={{marginRight: '4px', marginTop: '4px'}}><DeleteIcon/></Box>}
                        onClick={openConformation}
                    />
                    <ConfirmationModalWindow
                        isOpen={isOpenConformation}
                        title={'Are you sure you want to delete this task?'}
                        transformConfirmation={'translate(89%, 28%)'}
                        transformPopover={matches1130 && taskId ? 'translate(-25%, -4%)' : 'translate(-58.5%, -4%)'}
                        titleStyles={{
                            fontSize: '12px',
                            color: 'common.black',
                            fontWeight: 600,
                            width: '142px',
                            textAline: 'center'
                        }}
                        conformationStyles={{
                            width: '203px',
                            height: '129px'
                        }}
                        actionConfirmation={() => {
                            const id = todoId ? todoId : taskId
                            actionMoreHoriz(id)
                            closeConformation()
                        }}
                        closeConfirmation={closeConformation}
                    />
                    {
                        todoTitle &&
                        <Edit
                            isOpen={isOpenEdit}
                            value={todoName}
                            mistakeTextField={!!todoName && todoName.trim().length >= 100}
                            transformPopover={'translate(-58.5%, 23%)'}
                            transformEdit={'translate(89%, 28%)'}
                            actionEdit={changeTodo}
                            closeEdit={closeEdit}
                            onChange={changeTodoName}
                        />
                    }
                </Box>
            </>
        </CustomPopover>
    )

    return (
        <>
            {
                todoId ? param.todo === todoId && returnPopover() : returnPopover()
            }
        </>
    )
}