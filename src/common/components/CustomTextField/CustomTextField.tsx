import React, {ChangeEvent, FC} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    label: string
    size: 'small' | 'medium'
    multiline: boolean
    taskName?: string
    changeTaskName?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CustomTextField: FC<Props> = (props) => {
    const {label, size, multiline, taskName, changeTaskName} = props

    return (
        <>
            <TextField
                label={label}
                variant="standard"
                sx={{width: '100%'}}
                size={size}
                multiline={multiline}
                value={taskName}
                onChange={changeTaskName}
            />
        </>
    )
}