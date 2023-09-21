import {FC} from "react";

type Props = {
    todoTitle: string
}

export const TodolistsList: FC<Props> = ({todoTitle}) => {
    return (
        <>
            {todoTitle}
        </>
    )
}