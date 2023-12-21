import React, {FC} from "react";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {todolistsSelector} from "./todolists.selector";
import {TodolistsType} from "./todolists.types";
import {Main} from '../../common/utils/functions/dynamicSetMarginForContentPart/dynamicSetMarginForContentPart'
import s from './Todolists.module.css'
import {isOpenMenuSelector} from "../../app/app.selector";
import {CustomButton} from "../../common/components/CustomButton/CustomButton";
import {QuestionIcon} from "../../common/components/Icons/QuestionIcon";


type Props = {
    onClickLink: boolean
}

export const Todolists: FC<Props> = ({onClickLink}) => {

    const todos: TodolistsType[] = useAppSelector(todolistsSelector)
    const isOpenMenu: boolean = useAppSelector(isOpenMenuSelector)

    const {todo} = useParams()
    const todolist = todo ? todo : ''

    const filterTodos = (): JSX.Element => {
        const todo = todos.filter(td => td.id === todolist)

        if (todo.length <= 0) {
            return <Navigate to={'/todolist-toolkit'}/>
        } else {
            return <Todolist key={todo[0].id} todolistId={todo[0].id} todolistTitle={todo[0].title} todolist={todo[0]}/>
        }
    }

    const returnInfoPage = () => {
        return (
            <div className={s.notSingleTask}>
                <p className={s.notSingleTaskLabel}>sorry,</p>
                <p className={s.notSingleTaskText}>you haven't created any tasks.</p>
                <NavLink className={s.buttonCreateTodo} to={'/todolist-toolkit/todo/create-todo'}>
                    <CustomButton
                        color={'secondary'}
                        label={'Create new one'}
                        variant={'contained'}
                        sx={{
                            borderRadius: '8px',
                            width: '255px',
                            height: '56px',
                            boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                            color: '#FFF',
                            fontSize: '22px',
                            fontWeight: 700,
                            fontStyle: 'normal',
                            lineHeight: '34px',
                            marginBottom: '40px',
                        }}
                    />
                </NavLink>
                <div className={s.notSingleTaskImageContainer}>
                    <QuestionIcon/>
                </div>
            </div>
        )
    }

    const navigateToFirstTodo = () => {
        const todo = todos[0]
        return <Navigate to={`/todolist-toolkit/todo/${todo.id}`}/>
    }

    const test = todos.length > 0 ? navigateToFirstTodo() : returnInfoPage()

    return (
        <Main open={isOpenMenu} drawerWidth={'0px'} marginLeft={200}>
            <div className={s.todolists}>
                <div className={s.todosList}>
                    {
                        onClickLink ? filterTodos() : test
                    }
                </div>
            </div>
        </Main>
    )
}
