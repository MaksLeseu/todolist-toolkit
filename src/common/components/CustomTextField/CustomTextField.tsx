import React, {FC} from "react";
import TextField from "@mui/material/TextField";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {InputBaseProps} from "@mui/material/InputBase";
import {OutlinedInputProps} from "@mui/material/OutlinedInput";

type Props = {
    label: React.ReactNode
    type?: React.InputHTMLAttributes<unknown>['type']
    value?: string
    margin?: "normal" | "none" | "dense"
    name?: string
    variant?: 'filled' | 'standard' | 'outlined'
    size: 'small' | 'medium'
    multiline?: boolean
    sx?: SxProps<Theme>
    onBlur?: InputBaseProps['onBlur']
    onChange: OutlinedInputProps['onChange']
}

export const CustomTextField: FC<Props> = (props) => {
    const {
        label, type, size, multiline, sx = {width: '100%'}, value, margin, variant = 'standard', name, onBlur, onChange
    } = props

    return (
        <>
            <TextField
                label={label}
                type={type}
                variant={variant}
                margin={margin}
                name={name}
                sx={sx}
                size={size}
                multiline={multiline}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
            />
        </>
    )
}