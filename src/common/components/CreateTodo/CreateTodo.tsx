import React, {ChangeEvent, useState} from 'react';
import {CreateTodoIcon} from "../Icons/CreateTodoIcon";
import {CustomTextField} from "../CustomTextField/CustomTextField";
import {CustomButton} from "../CustomButton/CustomButton";
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";
import {PlusIcon} from "../Icons/PlusIcon";
import s from './CreateTodo.module.css'
import {NavLink} from "react-router-dom";
import Box from "@mui/material/Box";
import {TodolistsType} from "../../../features/Todolists/todolists.types";
import {useAppSelector} from "../../utils/hooks/useAppSelector";
import {todolistsSelector} from "../../../features/Todolists/todolists.selector";
import {useAppDispatch} from "../../utils/hooks/useAppDispatch";
import {todolistsThunk} from "../../../features/Todolists/todolists.slice";

export const CreateTodo = () => {
    const todos: TodolistsType[] = useAppSelector(todolistsSelector)
    const dispatch = useAppDispatch()

    const [count, setCount] = useState<number>(0)
    const addCount = () => setCount(count + 1)

    const [todoName, setTodoName] = useState<string>('')
    const changeTodoName = (e: ChangeEvent<HTMLInputElement>) => setTodoName(e.currentTarget.value)

    const addForms = (num: number) => {
        const arr = [];

        for (let i = 0; i < num; i++) {
            arr.push(<Box sx={{
                marginTop: '24px'
            }}>
                <p>Enter the name of task</p>
                <CustomTextField
                    size={'medium'}
                    placeholder={'here'}
                    sx={{
                        width: '540px',
                        height: '43px',
                        '&& input::placeholder': {
                            fontSize: '24px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: '30px',
                            color: 'rgba(112, 78, 204, 0.50)',
                        }
                    }}
                    InputProps={{
                        disableUnderline: true,
                        sx: {
                            fontSize: '32px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '38px',
                            color: 'secondary.main',
                            borderBottom: '1px #704ECC solid',
                        }
                    }}
                    onChange={changeTodoName}
                />
            </Box>)
        }
        return arr
    }

    const addTodo = () => {
        if (todoName.trim()) {
            dispatch(todolistsThunk.addTodolist({title: todoName}))
            setTodoName('')
        }
    }

    return (
        <Box sx={{marginTop: '30px'}}>
            <p className={s.label}>CREATE</p>
            <p className={s.title}>{
                todos.length > 0
                    ?
                    'your to do list'
                    :
                    'your first to do list'
            }</p>
            <div className={s.flexContainer}>
                <div className={s.textFieldColumn}>
                    <p>Enter the name of to do list</p>
                    <CustomTextField
                        size={'medium'}
                        placeholder={'here'}
                        value={todoName}
                        sx={{
                            width: '540px',
                            height: '43px',
                            '&& input::placeholder': {
                                fontSize: '32px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: '38px',
                                color: 'rgba(112, 78, 204, 0.50)',
                            }
                        }}
                        InputProps={{
                            disableUnderline: true,
                            sx: {
                                fontSize: '32px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: '38px',
                                color: 'secondary.main',
                                borderBottom: '1px #704ECC solid',
                            }
                        }}
                        onChange={changeTodoName}
                    />
                    {
                        count > 0 &&
                        <Box sx={{marginTop: '54px'}}>
                            {
                                addForms(count).map(el => el)
                            }
                        </Box>
                    }
                </div>
                <div className={s.imageColumn}>
                    <CreateTodoIcon/>
                </div>
            </div>
            <div className={s.buttonsContainer}>
                <CustomIconButton
                    disableRipple={false}
                    sx={{
                        width: '190px',
                        height: '50px',
                        borderRadius: '8px',
                        backgroundColor: '#F81',
                        color: '#FFF',
                        fontSize: '22px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: '24px',

                    }}
                    onClick={addCount}
                >
                    <>
                        <p>Add a task</p>
                        <PlusIcon/>
                    </>
                </CustomIconButton>
                <CustomButton
                    label={'Save'}
                    color={'secondary'}
                    sx={{
                        width: '190px',
                        height: '50px',
                        borderRadius: '8px',
                        color: '#FFF',
                        fontSize: '22px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: '34px',
                        boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                    }}
                    variant={'contained'}
                    onClick={addTodo}
                />
                <NavLink className={s.buttonCancel} to={'/todolist-toolkit/todo'}>
                    <CustomButton
                        label={'Cancel'}
                        color={'primary'}
                        sx={{
                            width: '190px',
                            height: '50px',
                            borderRadius: '8px',
                            color: '#704ECC',
                            fontSize: '22px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '34px',
                            border: '1px solid #704ECC',
                            boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                        }}
                        variant={'outlined'}
                    />
                </NavLink>
            </div>
        </Box>
    );
}