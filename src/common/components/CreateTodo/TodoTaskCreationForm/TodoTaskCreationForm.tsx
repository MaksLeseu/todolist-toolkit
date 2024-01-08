import React, {FC} from 'react';
import {CustomTextField} from "../../CustomTextField/CustomTextField";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../../utils/hooks/useAppSelector";
import {modeSelector} from "../../../../app/app.selector";

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
    const mode = useAppSelector(modeSelector)

    return (
        <>
            <Box sx={{
                width: '200px',
                color: mode === 'dark' ? 'text.secondary' : 'rgba(0, 0, 0, 0.50)',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '24px',
                margin: '0 0 13px 0',
                borderBottom: mode === 'dark' ? '1px #FFF solid' : '1px rgba(0, 0, 0, 0.50) solid',
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
                    },
                    '@media (max-width: 980px)': {
                        width: '440px',
                    },
                    '@media (max-width: 500px)': {
                        width: '340px',
                    },
                    '@media (max-width: 360px)': {
                        width: '300px',
                    },
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