import React, {FC} from "react";
import AddIcon from '@mui/icons-material/Add';
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

type Props = {
    label: string
    openFormAddTask: () => void
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


/*
<FormGroup
    sx={{paddingLeft: 2, paddingTop: 2,}}
>
    <FormControlLabel
        control={
            <CustomIconButton
                size={'small'}
                color={"default"}
                disableRipple={true}
                onClick={openFormAddTask}
            >
                <AddIcon/>
            </CustomIconButton>
        }
        label={label}
        className={className === 'addTask' ? s.btnAddTask : s.btnAddDescription}
    />
</FormGroup>*/
