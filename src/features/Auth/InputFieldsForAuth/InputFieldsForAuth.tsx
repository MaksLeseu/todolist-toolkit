import React, {FC, ReactNode, useState} from 'react';
import s from './InputFieldsForAuth.module.css'
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {InputAdornment} from "@mui/material";
import {VisibilityOffIcon} from "../../../common/components/Icons/VisibilityOffIcon";
import {VisibilityIcon} from "../../../common/components/Icons/VisibilityIcon";
import Box from "@mui/material/Box";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

type Props = {
    isOpen: boolean
    label: string
    testAccChildren?: ReactNode
    rememberMeChildren?: ReactNode
    loginValue: string
    passwordValue: string
    rememberMeValue?: boolean
    sx?: SxProps<Theme>
    onChange: {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    }
    onBlur: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    }
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
}

export const InputFieldsForAuth: FC<Props> = (props) => {
    const {
        isOpen,
        label,
        testAccChildren,
        rememberMeChildren,
        loginValue,
        passwordValue,
        rememberMeValue,
        sx,
        onChange,
        onBlur,
        onSubmit
    } = props

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const clickShowPassword = () => setShowPassword(!showPassword)

    const [showFocus, setShowFocus] = useState({
        login: false,
        password: false,
    })

    const focusing = (params: 'login' | 'password') => {
        const focus = {
            'login': () => setShowFocus({login: true, password: false}),
            'password': () => setShowFocus({login: false, password: true})
        }
        return focus[params]()
    }

    const blur = () => {
        setShowFocus({login: false, password: false})
        return onBlur
    }

    const focusLogin = showFocus.login ? {border: '2px #704ECC solid'} : {}
    const focusPassword = showFocus.password ? {border: '2px #704ECC solid'} : {}

    return (
        <>
            {
                isOpen
                &&
                <Box sx={{
                    width: '350px',
                    fontFamily: 'Montserrat',
                    ...sx
                }}>
                    <h2 className={s.label}>{label}</h2>
                    <div className={s.line}></div>
                    {testAccChildren && <div className={s.testAcc}>{testAccChildren}</div>}
                    <form onSubmit={onSubmit}>
                        <div className={s.flexContainer}>
                            <div className={s.inputFields}>
                                <CustomTextField
                                    size={'small'}
                                    name={'email'}
                                    placeholder={'Email'}
                                    value={loginValue}
                                    sx={{
                                        width: '328px',
                                        height: '56px',
                                        borderRadius: '8px',
                                        backgroundColor: '#F7F7F8',
                                        border: 'none',
                                        marginBottom: '16px',
                                        ...focusLogin
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            height: '24px',
                                            paddingLeft: '16px',
                                            paddingRight: '16px',
                                            marginTop: '16px',
                                            fontFamily: 'Montserrat',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '24px',
                                            color: 'rgba(16, 16, 18, 0.50)',
                                        },
                                    }}
                                    onChange={onChange}
                                    onBlur={blur}
                                    onFocus={() => focusing('login')}
                                />
                                <CustomTextField
                                    size={'small'}
                                    name={'password'}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={'Password'}
                                    value={passwordValue}
                                    sx={{
                                        width: '328px',
                                        height: '56px',
                                        borderRadius: '8px',
                                        backgroundColor: '#F7F7F8',
                                        ...focusPassword
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            height: '24px',
                                            paddingLeft: '16px',
                                            paddingRight: '16px',
                                            marginTop: '16px',
                                            fontFamily: 'Montserrat',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '24px',
                                            color: 'rgba(16, 16, 18, 0.50)',
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CustomIconButton
                                                    disableRipple={false}
                                                    onClick={clickShowPassword}
                                                >
                                                    {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                                </CustomIconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={onChange}
                                    onFocus={() => focusing('password')}
                                    onBlur={blur}
                                />
                                {rememberMeChildren &&
                                    <div className={s.rememberMe}>{rememberMeChildren}<p
                                        className={rememberMeValue && rememberMeValue ? s.rememberMeTextActive : s.rememberMeTextDefault}>Remember
                                        me</p></div>}
                            </div>
                            <CustomButton
                                type={'submit'}
                                color={'inherit'}
                                label={'Sign in'}
                                variant={'contained'}
                                sx={{
                                    backgroundColor: '#704ECC',
                                    width: '328px',
                                    height: '56px',
                                    fontSize: '16px',
                                    textTransform: 'none',
                                    color: '#FFFFFF',
                                    fontWeight: 700,
                                    borderRadius: '8px',
                                    fontFamily: 'Montserrat',
                                    boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                                    lineHeight: '34px',
                                    marginTop: '16px',
                                    '&:hover': {
                                        color: '#000'
                                    }
                                }}
                            />
                            <div className={s.textPolicy}>
                                <div className={s.containerTextPolicy}>
                                    <p className={s.mediumFont}>By countining you agree to our</p>
                                    <p className={s.boldFont}>Terms of Service.</p>
                                </div>
                                <div className={s.containerTextPolicy}>
                                    <p className={s.mediumFont}>Read our</p>
                                    <p className={s.boldFont}>Privacy Policy.</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </Box>
            }
        </>
    );
};