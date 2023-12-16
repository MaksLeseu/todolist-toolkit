import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {CustomPopover} from "../CustomPopover/CustomPopover";
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

type Props = {
    todoId?: string
    taskId?: string
    todoTitle?: string
    isOpen: any
    transformPopover?: string
    transformMoreHoriz?: string
    actionMoreHoriz: any
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
    '&:hover': {
        backgroundColor: 'secondary.main',
        color: 'primary.main',
        '& svg path': {
            fill: '#EFE3FF',
        },
    }
}

const activeButtonStyles = {}

export const MoreHoriz: FC<Props> = (props) => {
    const {
        isOpen,
        todoId,
        todoTitle,
        taskId,
        transformPopover,
        transformMoreHoriz,
        actionMoreHoriz,
        closeMoreHoriz
    } = props
    const param = useParams()
    const dispatch = useAppDispatch()

    const [todoName, setTodoName] = useState<string>('')
    const changeTodoName = (e: ChangeEvent<HTMLInputElement>): void => setTodoName(e.currentTarget.value)

    useEffect(() => {
        todoTitle && setTodoName(todoTitle)
    }, [todoTitle])

    const [isOpenConformation, setIsOpenConformation] = useState<HTMLButtonElement | null>(null)
    const closeConformation = () => setIsOpenConformation(null)
    const openConformation = (event: React.MouseEvent<HTMLButtonElement>) => setIsOpenConformation(event.currentTarget)

    const [isOpenEdit, setIsOpenEdit] = useState<HTMLButtonElement | null>(null)
    const closeEdit = () => {
        setIsOpenEdit(null)
        todoTitle && setTodoName(todoTitle)
    }
    const openEdit = (event: React.MouseEvent<HTMLButtonElement>) => setIsOpenEdit(event.currentTarget)

    const changeTodo = () => {
        if (todoName !== todoTitle && todoId) {
            dispatch(todolistsThunk.updateTodolist({todolistId: todoId, title: todoName}))
                .then(() => {
                    setIsOpenEdit(null)
                })
        }
    }

    const setActiveStyles = (params: 'edit' | 'delete') => {
        const activeStyles = {
            backgroundColor: 'secondary.main',
            color: 'primary.main',
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

    const activeStylesButtonEdit: object | null = setActiveStyles('edit')
    const activeStylesButtonDelete: object | null = setActiveStyles('delete')

    const returnPopover = () => (
        <CustomPopover
            anchorEl={isOpen}
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
                    backgroundColor: '#EFE3FF',
                    width: '95px',
                    height: '82px',
                    borderRadius: '4px',
                    padding: '12px 14px 13px 11px',
                }}>
                    <CustomButton
                        label={'Edit'}
                        variant={'text'}
                        sx={{
                            ...buttonStyles,
                            margin: '0 auto',
                        }}
                        icon={<Box sx={{marginRight: '4px', marginTop: '4px'}}><EditIcon/></Box>}
                        onClick={openEdit}
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
                        label={'Delete'}
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
                        transformPopover={'translate(-58.5%, -4%)'}
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