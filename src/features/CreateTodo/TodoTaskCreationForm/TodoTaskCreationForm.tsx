import React, {ChangeEventHandler, FC} from 'react';
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../../common/utils/hooks/useAppSelector";
import {modeSelector} from "../../../app/app.selector";
import {Mistake} from "../../../common/components/Mistake/Mistake";

type ObjectStyles = {
    fontSize: string
    fontStyle: string
    fontWeight: number
    lineHeight: string
}

type Props = {
    title: string
    value: string
    placeholder?: string
    mistakeTextField?: boolean
    mistakeTextFieldTitle?: string
    textFieldStyles?: { marginBottom: string }
    placeholderStyles?: ObjectStyles
    inputStyles?: ObjectStyles
    titleStyles?: { width: string }
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const TodoTaskCreationForm: FC<Props> = (props) => {
    const {
        title,
        value,
        placeholder,
        mistakeTextField,
        mistakeTextFieldTitle,
        placeholderStyles,
        textFieldStyles,
        inputStyles,
        titleStyles,
        onChange
    } = props
    const mode = useAppSelector(modeSelector)

    return (
        <>
            <Box sx={{
                width: '120px',
                color: mode === 'dark' ? 'text.secondary' : 'rgba(0, 0, 0, 0.50)',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '16px',
                margin: '0 0 13px 0',
                borderBottom: mode === 'dark' ? '1px #FFF solid' : '1px rgba(0, 0, 0, 0.50) solid',
                ...titleStyles
            }}>{title}</Box>
            <Mistake isOpen={!!mistakeTextField} errorTitle={mistakeTextFieldTitle}/>
            <CustomTextField
                size={'medium'}
                value={value}
                variant={'filled'}
                placeholder={placeholder ? placeholder : 'Here'}
                sx={{
                    width: '540px',
                    height: '43px',
                    marginBottom: '24px',
                    ...textFieldStyles,
                    '&& input::placeholder': {
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '28px',
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
                    sx: {
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '28px',
                        ...inputStyles,
                        color: 'secondary.main',
                        borderBottom: mistakeTextField ? '1px solid #EB2525' : '1px solid #704ECC',
                    }
                }}
                onChange={onChange}
            />
        </>
    );
};