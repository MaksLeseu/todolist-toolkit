import React, {FC} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    label: string
    size: 'small' | 'medium'
    multiline: boolean
}

export const CustomTextField: FC<Props> = ({label, size, multiline}) => {
    return (
        <>
            <TextField
                label={label}
                variant="standard"
                sx={{width: '100%'}}
                size={size}
                multiline={multiline}
            />
        </>
    )
}