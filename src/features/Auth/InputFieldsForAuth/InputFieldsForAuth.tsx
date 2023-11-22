import React, {FC, ReactNode, useState} from 'react';
import s from './InputFieldsForAuth.module.css'
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {InputAdornment} from "@mui/material";
import {VisibilityOffIcon} from "../../../common/components/Icons/VisibilityOffIcon";
import {VisibilityIcon} from "../../../common/components/Icons/VisibilityIcon";

type Props = {
    isOpen: boolean
    label: string
    testAccChildren?: ReactNode
    rememberMeChildren?: ReactNode
    loginValue: string
    passwordValue: string
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
                <div className={s.container}>
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
                                        marginBottom: '16px',
                                        ...focusPassword
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            height: '24px',
                                            paddingLeft: '16px',
                                            paddingRight: '16px',
                                            marginTop: '16px',
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
                                    <div className={s.rememberMe}>{rememberMeChildren}<p>Remember me</p></div>}
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
                </div>
            }
        </>
    );
};