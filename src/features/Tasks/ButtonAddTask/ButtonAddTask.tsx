import React, {FC} from "react";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {FormControlLabel, FormGroup} from "@mui/material";
import s from './ButtonAddTask.module.css'

type Props = {
    label: string
    className: string
    taskId?: string
    onClick: () => void
}

export const ButtonAddTask: FC<Props> = ({label, className, onClick, taskId}) => {
    console.log('Button')
    return (
        <>
            <FormGroup
                sx={{paddingLeft: 2, paddingTop: 2,}}
            >
                <FormControlLabel
                    control={
                        <IconButton
                            color={"default"}
                            size={'small'}
                            aria-label={'Add task'}
                            onClick={onClick}
                            disableRipple={true}
                        >
                            <AddIcon/>
                        </IconButton>
                    }
                    label={label}
                    className={className === 'addTask' ? s.btnAddTask : s.btnAddDescription}
                />
            </FormGroup>
        </>
    )
}