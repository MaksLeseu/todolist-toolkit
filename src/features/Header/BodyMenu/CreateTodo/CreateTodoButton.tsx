import React, {FC, MouseEventHandler} from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ListItemText from "@mui/material/ListItemText";
import s from '../../Header.module.css'
import {MSG_BTN} from "../../../../common/utils/constans/app-messages.const";
import {CustomListItem} from "../../../../common/components/CustomListItem/CustomListItem";

type Props = {
    open: boolean
    openModalWindow: MouseEventHandler | undefined
}

export const CreateTodoButton: FC<Props> = (props) => {
    const {open, openModalWindow} = props

    return (
        <CustomListItem
            disablePadding={true}
            sx={{display: 'block'}}
            titleTooltip={open ? null : 'Create to-do list'}
        >
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                }}
                onClick={openModalWindow}
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
        </CustomListItem>
    )
}