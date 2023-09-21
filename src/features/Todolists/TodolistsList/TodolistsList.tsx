import {FC} from "react";
import s from './TodolistsList.module.css'

type Props = {
    todoTitle: string
}

export const TodolistsList: FC<Props> = ({todoTitle}) => {
    return (
        <div className={s.todo}>
            {todoTitle}
        </div>
    )
}