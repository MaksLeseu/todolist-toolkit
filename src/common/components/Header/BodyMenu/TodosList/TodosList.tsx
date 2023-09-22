import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import s from "../../Header.module.css";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ListItemText from "@mui/material/ListItemText";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../store/store";

type Props = {
    open: boolean
}

export const TodosList: FC<Props> = ({ open }) => {
    const todos = useSelector((state: AppRootStateType) => state.todolists)

    return (
        <>
            {
                todos.map((todo, index) => (
                    <NavLink to={`/todo/${todo.id}`} className={s.todo}>
                        <Tooltip key={index} title={todo.title} placement="right-start" arrow>
                            <ListItem key={todo.id} disablePadding sx={{display: 'block'}}>
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
                                        {<InsertDriveFileIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={todo.title} sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        </Tooltip>
                    </NavLink>
                ))
            }
        </>
    )
}