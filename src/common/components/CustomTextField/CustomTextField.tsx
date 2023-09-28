import React, {ChangeEvent, FC} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    label: string
    taskName?: string
    description?: string
    size: 'small' | 'medium'
    multiline: boolean
    changeTaskName?: (e: ChangeEvent<HTMLInputElement>) => void
    changeDescription?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CustomTextField: FC<Props> = (props) => {
    const {label, size, multiline, taskName, description, changeTaskName, changeDescription} = props

    return (
        <>
            <TextField
                label={label}
                variant="standard"
                sx={{width: '100%'}}
                size={size}
                multiline={multiline}
                value={taskName || description}
                onChange={changeTaskName || changeDescription}
            />
        </>
    )
}