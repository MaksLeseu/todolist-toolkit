import React, {ChangeEvent, FC} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    label: string
    value: string
    size: 'small' | 'medium'
    multiline: boolean
    sx?: Object
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CustomTextField: FC<Props> = (props) => {
    const {label, size, multiline, sx, value, onChange} = props

    return (
        <>
            <TextField
                label={label}
                variant="standard"
                sx={sx ? sx : {width: '100%'}}
                size={size}
                multiline={multiline}
                value={value}
                onChange={onChange}
            />
        </>
    )
}