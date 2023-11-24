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
import {MistakeIcon} from "../../../common/components/Icons/MistakeIcon";
import {SuccessIcon} from "../../../common/components/Icons/SuccessIcon";

type Props = {
    isOpen: boolean
    label: string
    testAccChildren?: ReactNode
    rememberMeChildren?: ReactNode
    loginValue: string
    passwordValue: string
    rememberMeValue?: boolean
    touchedPassword: boolean | undefined
    touchedLogin: boolean | undefined
    errorsPassword: string | undefined
    errorsLogin: string | undefined
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
    hardcodeParamsForTestAcc?: (params: 'login' | 'password') => 'free@samuraijs.com' | 'free'
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
        touchedLogin,
        touchedPassword,
        errorsPassword,
        errorsLogin,
        sx,
        onChange,
        onBlur,
        onSubmit,
        hardcodeParamsForTestAcc
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

    const blur = (e: React.FocusEvent<any, Element>) => {
        setShowFocus({login: false, password: false})
        onBlur(e)
    }

    const focusLogin = showFocus.login ? {border: '2px #704ECC solid'} : {}
    const focusPassword = showFocus.password ? {border: '2px #704ECC solid'} : {}

    const showErrorsLogin = touchedLogin && errorsLogin ? {border: '2px #EB2525 solid'} : {}
    const showErrorsPassword = touchedPassword && errorsPassword ? {border: '2px #EB2525 solid'} : {}

    const successLogin = touchedLogin && !errorsLogin ? {border: '2px #26C518 solid'} : '';
    const successPassword = touchedPassword && !errorsPassword ? {border: '2px #26C518 solid'} : '';

    return (
        <>
            {
                isOpen
                &&
                <Box sx={{
                    width: '350px',
                    ...sx
                }}>
                    <h2 className={s.label}>{label}</h2>
                    <div className={s.line}></div>
                    {testAccChildren && <div className={s.testAcc}>{testAccChildren}</div>}
                    <form onSubmit={onSubmit}>
                        <div className={s.flexContainer}>
                            <div className={s.inputFields}>
                                <div>
                                    {
                                        touchedLogin && errorsLogin &&
                                        <div className={s.errorsContainer}>
                                            <MistakeIcon/>
                                            <p className={s.error}>{errorsLogin}</p>
                                        </div>
                                    }
                                </div>
                                <CustomTextField
                                    size={'small'}
                                    name={'email'}
                                    placeholder={'Email'}
                                    value={!rememberMeChildren ? hardcodeParamsForTestAcc && hardcodeParamsForTestAcc('login') : loginValue}
                                    sx={{
                                        width: '328px',
                                        height: '56px',
                                        borderRadius: '8px',
                                        backgroundColor: 'grey.A100',
                                        border: 'none',
                                        marginBottom: '16px',
                                        ...focusLogin,
                                        ...showErrorsLogin,
                                        ...successLogin
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            height: '24px',
                                            paddingLeft: '16px',
                                            paddingRight: '16px',
                                            marginTop: '16px',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '24px',
                                            color: 'text.secondary',
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {successLogin && <SuccessIcon/>}
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={onChange}
                                    onBlur={blur}
                                    onFocus={() => focusing('login')}
                                />
                                <div>
                                    {
                                        touchedPassword && errorsPassword &&
                                        <div className={s.errorsContainer}>
                                            <MistakeIcon/>
                                            <p className={s.error}>{errorsPassword}</p>
                                        </div>
                                    }
                                </div>
                                <CustomTextField
                                    size={'small'}
                                    name={'password'}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={'Password'}
                                    value={!rememberMeChildren ? hardcodeParamsForTestAcc && hardcodeParamsForTestAcc('password') : passwordValue}
                                    sx={{
                                        width: '328px',
                                        height: '56px',
                                        borderRadius: '8px',
                                        backgroundColor: 'grey.A100',
                                        ...focusPassword,
                                        ...showErrorsPassword,
                                        ...successPassword
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            height: '24px',
                                            paddingLeft: '16px',
                                            paddingRight: '16px',
                                            marginTop: '16px',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '24px',
                                            color: 'text.secondary',
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CustomIconButton
                                                    disableRipple={false}
                                                    onClick={clickShowPassword}
                                                >
                                                    {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                                </CustomIconButton>
                                                {successPassword && <SuccessIcon/>}
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
                                color={'secondary'}
                                label={'Sign in'}
                                variant={'contained'}
                                sx={{
                                    width: '328px',
                                    height: '56px',
                                    fontSize: '16px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    borderRadius: '8px',
                                    boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                                    lineHeight: '34px',
                                    marginTop: '16px',
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