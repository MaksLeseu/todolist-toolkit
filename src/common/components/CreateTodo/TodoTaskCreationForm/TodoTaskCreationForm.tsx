import React, {FC} from 'react';
import {CustomTextField} from "../../CustomTextField/CustomTextField";
import Box from "@mui/material/Box";

type ObjectStyles = {
    fontSize: string
    fontStyle: string
    fontWeight: number
    lineHeight: string
}

type Props = {
    title: string
    value: string
    textFieldStyles?: { marginBottom: string }
    placeholderStyles?: ObjectStyles
    inputStyles?: ObjectStyles
    titleStyles?: { width: string }
    onChange: any
}

export const TodoTaskCreationForm: FC<Props> = (props) => {
    const {title, value, placeholderStyles, textFieldStyles, inputStyles, titleStyles, onChange} = props

    return (
        <>
            <Box sx={{
                width: '200px',
                color: 'rgba(0, 0, 0, 0.50)',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '24px',
                margin: '0 0 13px 0',
                borderBottom: '1px rgba(0, 0, 0, 0.50) solid',
                ...titleStyles
            }}>{title}</Box>
            <CustomTextField
                size={'medium'}
                value={value}
                placeholder={'here'}
                sx={{
                    width: '540px',
                    height: '43px',
                    marginBottom: '24px',
                    ...textFieldStyles,
                    '&& input::placeholder': {
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: '30px',
                        ...placeholderStyles,
                        color: 'rgba(112, 78, 204, 0.50)',
                    }
                }}
                InputProps={{
                    disableUnderline: true,
                    sx: {
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: '30px',
                        ...inputStyles,
                        color: 'secondary.main',
                        borderBottom: '1px #704ECC solid',
                    }
                }}
                onChange={onChange}
            />
        </>
    );
};