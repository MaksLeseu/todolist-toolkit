import React, {FC, useState} from "react";
import {ButtonRemoveTodo} from "./ButtonRemoveTodo/ButtonRemoveTodo";
import {
    ConfirmationModalWindow
} from "../../../../../common/components/СonfirmationModalWindow/СonfirmationModalWindow";

type Props = {
    todolistId: string
    todolistTitle: string
    removeTodo: (todolistId: string | undefined) => void
}

export const RemoveTodo: FC<Props> = (props) => {
    const {todolistId, todolistTitle, removeTodo} = props

    const [confirmation, setConfirmation] = useState<boolean>(false)

    const deletionConfirmation = (todolistId: string) => {
        removeTodo(todolistId)
        setConfirmation(false)
    }

    const changeConfirmation = () => setConfirmation(!confirmation)

    return (
        <>
            <ButtonRemoveTodo
                openConfirmation={changeConfirmation}
            />
            <ConfirmationModalWindow
                isOpen={confirmation}
                title={'to-do list'}
                description={`This will delete ${todolistTitle}`}
                closeConfirmation={changeConfirmation}
                actionConfirmation={() => deletionConfirmation(todolistId)}
            />
        </>
    )
}