import React, {FC, MouseEventHandler} from "react";
import AddIcon from '@mui/icons-material/Add';
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

type Props = {
    label: React.ReactNode
    openFormAddTask: MouseEventHandler | undefined
}

export const AddTaskButton: FC<Props> = ({label, openFormAddTask}) => {
    return (
        <CustomIconButton
            size={'small'}
            color={"default"}
            disableRipple={true}
            sx={{marginTop: 2}}
            onClick={openFormAddTask}
        >
            <ListItemButton
                sx={{height: '35px', borderRadius: '3px'}}
            >
                <ListItemIcon
                    sx={{display: 'flex', alignItems: 'center'}}
                >
                    <AddIcon/>
                    <ListItemText
                        sx={{color: 'black', marginLeft: '5px'}}
                        primary={label}
                    />
                </ListItemIcon>
            </ListItemButton>
        </CustomIconButton>
    )
}

