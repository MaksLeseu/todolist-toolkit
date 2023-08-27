import React, {FC} from "react";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

type ButtonAddTaskPropsType = {
    onClick: () => void
}

export const ButtonAddTask: FC<ButtonAddTaskPropsType> = (props) => {
    return (
        <>
            <IconButton
                color={"inherit"}
                size={'small'}
                aria-label={'Add task'}
                onClick={props.onClick}
                >
                <AddIcon/>
            </IconButton>
        </>
    )
}