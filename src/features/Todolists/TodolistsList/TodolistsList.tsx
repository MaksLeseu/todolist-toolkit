import {FC} from "react";
import s from './TodolistsList.module.css'
import DescriptionIcon from '@mui/icons-material/Description';

type Props = {
    todoTitle: string
}

export const TodolistsList: FC<Props> = ({todoTitle}) => {
    return (
        <div className={s.todo}>
            <div className={s.container}>
                <DescriptionIcon color={'info'} />
                <div className={s.title}>{todoTitle}</div>
            </div>
        </div>
    )
}