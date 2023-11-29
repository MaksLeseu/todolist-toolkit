import {useFormik} from "formik";
import {useAppDispatch} from "../../common/utils/hooks/useAppDispatch";
import {CustomButton} from "../../common/components/CustomButton/CustomButton";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {isLoggedInSelector} from "./auth.selector";
import {Navigate} from "react-router-dom";
import {EmailIcon} from "../../common/components/Icons/EmailIcon";
import {InputFieldsForAuth} from "./InputFieldsForAuth/InputFieldsForAuth";
import React, {useState} from "react";
import {TestAccIcon} from "../../common/components/Icons/TestAccIcon";
import {CustomCheckbox} from "../../common/components/CustomCheckbox/CustomCheckbox";
import {Link} from "@mui/material";
import {authThunk} from "./auth.slice";
import s from './Auth.module.css'

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

export const Auth = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }

            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 3) {
                errors.password = "Must be 3 characters or more";
            }

            return errors;
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(authThunk.login({data: values}))
        },
    })

    const isLoggedIn: boolean = useAppSelector(isLoggedInSelector)

    const [account, setAccount] = useState({
        test: false,
        user: false
    })
    const [visibleButtons, setVisibleButtons] = useState<'testAcc' | 'nothing' | 'email'>('nothing')

    const openAccount = (params: 'test' | 'user') => {
        const account = {
            'test': () => {
                setAccount({
                    test: true,
                    user: false
                })
                setVisibleButtons('testAcc')
            },
            'user': () => {
                setAccount({
                    test: false,
                    user: true
                })
                setVisibleButtons('email')
            }
        }
        return account[params]()
    }

    if (isLoggedIn) {
        return <Navigate to={'/todolist-toolkit'}/>
    }

    const hardcodeParamsForTestAcc = (params: 'login' | 'password'): 'free@samuraijs.com' | 'free' => {
        const hardcode = {
            'login': (): 'free@samuraijs.com' => formik.values.email = 'free@samuraijs.com',
            'password': (): 'free' => formik.values.password = 'free',
        }
        return hardcode[params]()
    }

    return (
        <div className={s.authContainer}>
            <h2 className={s.label}>CHOOSE</h2>
            <p className={s.authTitle}>the way you want to enter, please</p>
            {
                visibleButtons === 'email' ||
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
                    }}
                    onClick={() => openAccount('user')}
                />
            }
            {
                visibleButtons === 'testAcc' ||
                <CustomButton
                    color={'primary'}
                    label={'Use a test account'}
                    icon={<div className={s.icon}><TestAccIcon/></div>}
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
                        marginBottom: '32px',
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'normal',
                    }}
                    onClick={() => openAccount('test')}
                />
            }
            <InputFieldsForAuth
                isOpen={account.user}
                label={'Continue with email'}
                loginValue={formik.values.email}
                passwordValue={formik.values.password}
                rememberMeValue={formik.values.rememberMe}
                touchedLogin={formik.touched.email}
                touchedPassword={formik.touched.password}
                errorsLogin={formik.errors.email}
                errorsPassword={formik.errors.password}
                sx={{
                    marginTop: '8px'
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
            <InputFieldsForAuth
                isOpen={account.test}
                label={'Use a test account'}
                loginValue={formik.values.email}
                passwordValue={formik.values.password}
                touchedLogin={formik.touched.email}
                touchedPassword={formik.touched.password}
                errorsLogin={formik.errors.email}
                errorsPassword={formik.errors.password}
                sx={{
                    marginTop: '28px'
                }}
                testAccChildren={<>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </>}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onSubmit={formik.handleSubmit}
                hardcodeParamsForTestAcc={hardcodeParamsForTestAcc}
            />
            <Link
                href={'https://social-network.samuraijs.com/signUp'}
                sx={{
                    width: '328px',
                    height: '56px',
                    marginBottom: '47px',
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
                    }}
                />
            </Link>
        </div>
    )
}
