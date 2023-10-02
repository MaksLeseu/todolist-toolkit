import React, {ChangeEvent, FC} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    label: string
    type?: string
    value: string
    margin?: "normal" | "none" | "dense" | undefined
    name?: string
    variant?: 'filled' | 'standard' | 'outlined'
    size: 'small' | 'medium'
    multiline: boolean
    sx?: Object
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CustomTextField: FC<Props> = (props) => {
    const {label, type, size, multiline, sx, value, margin, variant, name, onBlur, onChange} = props

    return (
        <>
            <TextField
                label={label}
                type={type && type}
                variant={variant ? variant : 'standard'}
                margin={margin && margin}
                name={name && name}
                sx={sx ? sx : {width: '100%'}}
                size={size}
                multiline={multiline}
                value={value}
                onBlur={onBlur && onBlur}
                onChange={onChange}
            />
        </>
    )
}