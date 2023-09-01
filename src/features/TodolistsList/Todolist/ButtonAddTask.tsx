import React, {FC} from "react";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {FormControlLabel, FormGroup} from "@mui/material";

type ButtonAddTaskPropsType = {
    onClick: () => void
}

export const ButtonAddTask: FC<ButtonAddTaskPropsType> = (props) => {
    return (
        <>
            <FormGroup
                sx={{ p: 2 }}
            >
                <FormControlLabel
                    control={
                        <IconButton
                            color={"inherit"}
                            size={'small'}
                            aria-label={'Add task'}
                            onClick={props.onClick}
                        >
                            <AddIcon/>
                        </IconButton>
                    }
                    label={'Add task'}
                />
            </FormGroup>
        </>
    )
}