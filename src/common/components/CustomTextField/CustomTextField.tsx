import React, {FC} from "react";
import TextField from "@mui/material/TextField";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {InputBaseProps} from "@mui/material/InputBase";
import {OutlinedInputProps} from "@mui/material/OutlinedInput";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";

type Props = {
    label?: React.ReactNode
    type?: React.InputHTMLAttributes<unknown>['type']
    value?: string
    defaultValue?: unknown
    margin?: "normal" | "none" | "dense"
    name?: string
    variant?: 'filled' | 'standard' | 'outlined'
    size: 'small' | 'medium'
    multiline?: boolean
    placeholder?: string
    sx?: SxProps<Theme>
    hiddenLabel?: boolean
    InputProps?: Partial<OutlinedInputProps> | { disableUnderline: boolean }
    onBlur?: InputBaseProps['onBlur']
    onChange: OutlinedInputProps['onChange']
    onFocus?: StandardInputProps['onFocus']
}

export const CustomTextField: FC<Props> = (props) => {
    const {
        label,
        type,
        size,
        multiline,
        sx = {width: '100%'},
        value,
        margin,
        variant = 'standard',
        InputProps,
        name,
        defaultValue,
        placeholder,
        hiddenLabel,
        onBlur,
        onChange,
        onFocus
    } = props

    return (
        <>
            <TextField
                InputProps={InputProps}
                label={label}
                type={type}
                variant={variant}
                margin={margin}
                name={name}
                sx={sx}
                size={size}
                multiline={multiline}
                value={value}
                defaultValue={defaultValue}
                hiddenLabel={hiddenLabel}
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
            />
        </>
    )
}