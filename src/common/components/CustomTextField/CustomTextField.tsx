import React, {ChangeEvent, FC} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    label: string
    size: 'small' | 'medium'
    multiline: boolean
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CustomTextField: FC<Props> = ({label, size, multiline, onChange, value}) => {
    return (
        <>
            <TextField
                label={label}
                variant="standard"
                sx={{width: '100%'}}
                size={size}
                multiline={multiline}
                value={value}
                onChange={onChange}
            />
        </>
    )
}