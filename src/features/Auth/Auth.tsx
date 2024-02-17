import {CustomButton} from "../../common/components/CustomButton/CustomButton";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {isLoggedInSelector} from "./auth.selector";
import {Navigate} from "react-router-dom";
import {EmailIcon} from "../../common/components/Icons/EmailIcon";
import {InputFieldsForAuth} from "./InputFieldsForAuth/InputFieldsForAuth";
import React, {useState} from "react";
import {CustomCheckbox} from "../../common/components/CustomCheckbox/CustomCheckbox";
import {Link} from "@mui/material";
import s from './Auth.module.css'
import {useAuth} from "../../common/utils/hooks/useAuth";

export const Auth = () => {
    const {formik} = useAuth()

    const isLoggedIn: boolean = useAppSelector(isLoggedInSelector)

    const [account, setAccount] = useState<boolean>(false)
    const [visibleButtons, setVisibleButtons] = useState<boolean>(true)

    const openAccount = () => {
        setAccount(true)
        setVisibleButtons(false)
    }

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={s.authContainer}>
            <h2 className={s.label}>CHOOSE</h2>
            <p className={s.authTitle}>the way you want to enter, please</p>
            {
                visibleButtons &&
                <CustomButton
                    color={'primary'}
                    label={'Continue with email'}
                    icon={<div className={s.icon}><EmailIcon/></div>}
                    variant={'contained'}
                    sx={{
                        width: '328px',
                        height: '56px',
                        fontSize: '16px',
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: '8px',
                        boxShadow: '0',
                        lineHeight: '24px',
                        marginBottom: '12px',
                        display: 'flex',
                        justifyContent: 'normal',
                        '&:hover': {
                            backgroundColor: 'common.white'
                        },
                        '@media (max-width: 340px)': {
                            width: '300px'
                        },
                    }}
                    onClick={openAccount}
                />
            }
            <InputFieldsForAuth
                isOpen={account}
                label={'Continue with email'}
                loginValue={formik.values.email}
                passwordValue={formik.values.password}
                rememberMeValue={formik.values.rememberMe}
                touchedLogin={formik.touched.email}
                touchedPassword={formik.touched.password}
                errorsLogin={formik.errors.email}
                errorsPassword={formik.errors.password}
                sx={{
                    marginTop: '8px',
                }}
                rememberMeChildren={
                    <CustomCheckbox
                        checked={formik.values.rememberMe}
                        name={'rememberMe'}
                        disableRipple={true}
                        onChange={formik.handleChange}
                    />
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onSubmit={formik.handleSubmit}
            />
            <Link
                href={'https://social-network.samuraijs.com/signUp'}
                sx={{
                    width: '328px',
                    height: '56px',
                    marginBottom: '47px',
                    '@media (max-width: 340px)': {
                        width: '300px',
                    },
                }}
                target="_blank"
            >
                <CustomButton
                    color={'secondary'}
                    label={'Is it your first time?'}
                    additionalLabel={<p className={s.labelForButton}>Sign up</p>}
                    variant={'contained'}
                    sx={{
                        width: '328px',
                        height: '56px',
                        fontSize: '16px',
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: '8px',
                        fontStyle: 'normal',
                        boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                        lineHeight: '34px',
                        marginBottom: '108px',
                        '@media (max-width: 340px)': {
                            width: '300px',
                        },
                    }}
                />
            </Link>
        </div>
    )
}
