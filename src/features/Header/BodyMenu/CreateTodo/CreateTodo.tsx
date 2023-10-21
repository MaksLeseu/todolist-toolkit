import React, {ChangeEvent, FC, useState} from "react";
import {AddTodoModalWindow} from "../../../../common/components/AddTodoModalWindow/AddTodoModalWindow";
import {CreateTodoButton} from "./CreateTodoButton";
import {todolistsThunk} from "../../../Todolists/todolists.slice";
import {useAppDispatch} from "../../../../common/utils/hooks/useAppDispatch";

type Props = {
    open: boolean
}

export const CreateTodo: FC<Props> = (props) => {
    const {open} = props

    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [todoName, setTodoName] = useState<string>('')

    const changeTodoName = (e: ChangeEvent<HTMLInputElement>) => setTodoName(e.currentTarget.value)

    const addTodo = () => {
        if (todoName.trim()) {
            dispatch(todolistsThunk.addTodolist({title: todoName}))
            setTodoName('')
            closeModalWindow()
        }
    }

    const openModalWindow = () => setIsOpen(true)
    const closeModalWindow = () => setIsOpen(false)

    return (
        <>
            <CreateTodoButton
                open={open}
                openModalWindow={openModalWindow}
            />
            <AddTodoModalWindow
                isOpen={isOpen}
                value={todoName}
                addTodo={addTodo}
                changeTodoName={changeTodoName}
                closeModalWindow={closeModalWindow}
            />
        </>
    )
}