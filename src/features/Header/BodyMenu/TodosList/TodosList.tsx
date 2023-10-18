import React, {FC, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import s from "../../Header.module.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ListItemText from "@mui/material/ListItemText";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {CustomListItem} from "../../../../common/components/CustomListItem/CustomListItem";
import {ButtonRemoveTodo} from "../../../Todolists/Todolist/ButtonRemoveTodo/ButtonRemoveTodo";
import {ConfirmationModalWindow} from "../../../../common/components/СonfirmationModalWindow/СonfirmationModalWindow";

type Props = {
    open: boolean
    removeTodo: (todolistId: string | undefined) => void
}

export const TodosList: FC<Props> = ({open, removeTodo}) => {
    const todos = useSelector((state: AppRootStateType) => state.todolists)

    const [confirmation, setConfirmation] = useState<boolean>(false)

    const {todo} = useParams()
    const todolist = todo ? todo : ''

    const deletionConfirmation = (todolistId: string | undefined) => {
        setConfirmation(false)
        removeTodo(todolistId)
    }

    const changeConfirmation = () => setConfirmation(!confirmation)

    return (
        <>
            {
                todos.map((todo, index) => (
                    <NavLink to={`/todolist-toolkit/todo/${todo.id}`} key={index} className={s.todo}>
                        <CustomListItem
                            disablePadding={true}
                            sx={{display: 'block'}}
                            titleTooltip={open ? null : todo.title}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {<div className={s.icon}>
                                        <InsertDriveFileIcon/>
                                    </div>}
                                </ListItemIcon>
                                <ListItemText
                                    primary={todo.title}
                                    sx={{opacity: open ? 1 : 0, color: 'rgba(236, 236, 241)'}}
                                />
                                {
                                    open && todolist === todo.id &&
                                    <ButtonRemoveTodo
                                        openConfirmation={changeConfirmation}
                                    />
                                }
                                {
                                    confirmation && todolist === todo.id &&
                                    <ConfirmationModalWindow
                                        todolistId={todo.id}
                                        title={todo.title}
                                        closeConfirmation={changeConfirmation}
                                        deletionConfirmation={deletionConfirmation}
                                    />
                                }
                            </ListItemButton>
                        </CustomListItem>
                    </NavLink>
                ))
            }
        </>
    )
}