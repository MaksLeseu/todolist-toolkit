import React, {FC} from "react";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {todolistsSelector} from "./todolists.selector";
import {TodolistsType} from "./todolists.types";
import {Main} from '../../common/utils/functions/dynamicSetMarginForContentPart/dynamicSetMarginForContentPart'
import s from './Todolists.module.css'
import {isOpenMenuSelector, modeSelector} from "../../app/app.selector";
import {CustomButton} from "../../common/components/CustomButton/CustomButton";
import {QuestionIconLight} from "../../common/components/Icons/QuestionIconLight";
import Box from "@mui/material/Box";
import {QuestionIconDark} from "../../common/components/Icons/QuestionIconDark";
import {BASE_ROUTE} from "../../routes/Routes";


type Props = {
    isTodoListClickable: boolean
}

export const Todolists: FC<Props> = ({isTodoListClickable}) => {

    const todos: TodolistsType[] = useAppSelector(todolistsSelector)
    const isOpenMenu: boolean = useAppSelector(isOpenMenuSelector)
    const mode = useAppSelector(modeSelector)

    const {todo} = useParams()
    const todolist = todo ? todo : ''

    const filterTodos = (): JSX.Element => {
        const todo = todos.filter(td => td.id === todolist)

        if (todo.length <= 0) {
            return <Navigate to={'/'}/>
        } else {
            return <Todolist key={todo[0].id} todolistId={todo[0].id} todolistTitle={todo[0].title} todolist={todo[0]}/>
        }
    }

    const returnInfoPage = () => {
        return (
            <div className={s.notSingleTask}>
                <Box
                    sx={{
                        color: 'text.primary',
                        fontSize: '38px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: '44px',
                        textTransform: 'uppercase',
                        margin: 0,
                        '@media (max-width: 400px)': {
                            fontSize: '28px',
                            lineHeight: '34px',
                        }
                    }}
                >
                    sorry,
                </Box>
                <Box
                    sx={{
                        width: '270px',
                        color: 'text.primary',
                        textAlign: 'center',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: '24px',
                        textTransform: 'uppercase',
                        margin: '0 0 32px 0',
                        '@media (max-width: 400px)': {
                            margin: '0 0 20px 0',
                        }
                    }}
                >
                    you haven't created any tasks.
                </Box>
                <NavLink className={s.buttonCreateTodo} to={`${BASE_ROUTE}/todo/create-todo`}>
                    <CustomButton
                        color={'secondary'}
                        label={'Create new one'}
                        variant={'contained'}
                        sx={{
                            borderRadius: '8px',
                            width: '210px',
                            height: '56px',
                            boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                            color: '#FFF',
                            fontSize: '18px',
                            fontWeight: 700,
                            fontStyle: 'normal',
                            lineHeight: '24px',
                            transition: 'all 0.6s',
                            '&:hover': {
                                transition: 'all 0.6s',
                                transform: 'scale(1.05)',
                            },
                        }}
                    />
                </NavLink>
                <div className={s.notSingleTaskImageContainer}>
                    {mode === 'dark' ? <QuestionIconDark/> : <QuestionIconLight/>}
                </div>
            </div>
        )
    }

    const navigateToFirstTodo = () => {
        const todo = todos[0]
        return <Navigate to={`${BASE_ROUTE}/todo/${todo.id}`}/>
    }

    const redirectToPage = todos.length > 0 ? navigateToFirstTodo() : returnInfoPage()

    return (
        <Main open={isOpenMenu} drawerwidth={'0px'} marginleft={200}>
            <div className={s.todolists}>
                <div className={s.todosList}>
                    {
                        isTodoListClickable ? filterTodos() : redirectToPage
                    }
                </div>
            </div>
        </Main>
    )
}
