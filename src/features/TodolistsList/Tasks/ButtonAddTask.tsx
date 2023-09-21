import React, {FC} from "react";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {FormControlLabel, FormGroup} from "@mui/material";
import s from './Task.module.css'

type ButtonAddTaskPropsType = {
    onClick: () => void
}

export const ButtonAddTask: FC<ButtonAddTaskPropsType> = (props) => {
    return (
        <>
            <FormGroup
                sx={{ paddingLeft: 2, paddingTop: 2, }}
            >
                <FormControlLabel
                    control={
                        <IconButton
                            color={"default"}
                            size={'small'}
                            aria-label={'Add task'}
                            onClick={props.onClick}
                            disableRipple={true}
                        >
                            <AddIcon/>
                        </IconButton>
                    }
                    label={'Add a task'}
                    className={s.btnAddTask}
                />
            </FormGroup>
        </>
    )
}