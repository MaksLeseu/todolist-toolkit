import React, {FC, ReactNode} from 'react';
import s from './InputFieldsForAuth.module.css'
import {CustomTextField} from "../../../common/components/CustomTextField/CustomTextField";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";

type Props = {
    isOpen: boolean
    label: string
    testAccChildren?: ReactNode
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
        loginValue,
        passwordValue,
        onChange,
        onBlur,
        onSubmit
    } = props

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
                                    onBlur={onBlur}
                                />
                                <CustomTextField
                                    size={'small'}
                                    name={'password'}
                                    type={'password'}
                                    placeholder={'Password'}
                                    value={passwordValue}
                                    sx={{
                                        width: '328px',
                                        height: '56px',
                                        borderRadius: '8px',
                                        backgroundColor: '#F7F7F8',
                                        border: 'none',
                                        marginBottom: '16px',
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
                                    onBlur={onBlur}
                                />
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