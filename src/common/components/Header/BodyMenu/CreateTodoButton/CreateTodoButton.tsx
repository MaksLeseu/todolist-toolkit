import React, {FC} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import s from '../../Header.module.css'
import {MSG_BTN} from "../../../../constans/app-messages.const";

type Props = {
    open: boolean
}

export const CreateTodoButton: FC<Props> = ({open}) => {
    return (
        <Tooltip title={'Create to-do list'} placement="right-start" arrow>
            <ListItem disablePadding sx={{display: 'block'}}>
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
                            <NoteAddIcon/>
                        </div>}
                    </ListItemIcon>
                    <ListItemText primary={MSG_BTN.CREATE_TODO_LIST}
                                  sx={{opacity: open ? 1 : 0, color: 'rgba(236, 236, 241)'}}/>
                </ListItemButton>
            </ListItem>
        </Tooltip>
    )
}