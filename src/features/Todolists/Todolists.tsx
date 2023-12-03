import React, {FC} from "react";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {HomePageTodos} from "./HomePageTodos/HomePageTodos";
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {todolistsSelector} from "./todolists.selector";
import {TodolistsType} from "./todolists.types";
import {CustomButton} from "../../common/components/CustomButton/CustomButton";
import {QuestionIcon} from "../../common/components/Icons/QuestionIcon";
import s from './Todolists.module.css'


type Props = {
    onClickLink: boolean
}

export const Todolists: FC<Props> = ({onClickLink}) => {

    const todos: TodolistsType[] = useAppSelector(todolistsSelector)

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

    const returnTodosList = (): JSX.Element[] => todos.map(td => (
        <NavLink to={`/todolist-toolkit/todo/${td.id}`} key={td.id} className={s.todo}>
            <HomePageTodos key={td.id} todoTitle={td.title}/>
        </NavLink>
    ))

    const returnTodos = (componentName: string) =>
        componentName === 'todo' && filterTodos()

    return (
        <div className={s.todolists}>
            {
                onClickLink ? <p className={s.title}>To-do lists</p>
                    :
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
            }
            <div className={s.todosList}>
                {
                    onClickLink ? returnTodos('todo') : returnTodos('todoList')
                }
            </div>
        </div>
    )
}
