import {useFormik} from "formik";
import {useAppDispatch} from "../../common/utils/hooks/useAppDispatch";
import {authThunk} from "./auth.slice";
import s from './Auth.module.css'
import {CustomButton} from "../../common/components/CustomButton/CustomButton";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {isLoggedInSelector} from "./auth.selector";
import {Navigate} from "react-router-dom";
import {Icon} from "../../common/components/Icon/Icon";
import {InputFieldsForAuth} from "./InputFieldsForAuth/InputFieldsForAuth";
import {useState} from "react";

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

    const [testAcc, setTestAcc] = useState<boolean>(false)
    const [emailAcc, setEmailAcc] = useState<boolean>(false)
    const [visibleButtons, setVisibleButtons] = useState<'testAcc' | 'nothing' | 'email'>('nothing')

    const openTestAcc = () => {
        setTestAcc(true)
        setVisibleButtons('testAcc')
        emailAcc && setEmailAcc(false)
    }

    const openEmailLogin = () => {
        setEmailAcc(true)
        setVisibleButtons('email')
        testAcc && setTestAcc(false)
    }

    if (isLoggedIn) {
        return <Navigate to={'/todolist-toolkit'}/>
    }

    return (
        <div className={s.authContainer}>
            <h2 className={s.label}>CHOOSE</h2>
            <p className={s.authTitle}>the way you want to enter, please</p>
            {
                visibleButtons === 'email' ||
                <CustomButton
                    color={'inherit'}
                    label={'Continue with email'}
                    icon={<div className={s.icon}><Icon id={'email'}/></div>}
                    variant={'contained'}
                    sx={{
                        backgroundColor: '#EFE3FF',
                        width: '328px',
                        height: '56px',
                        fontSize: '16px',
                        textTransform: 'none',
                        color: '#000000',
                        fontWeight: 500,
                        borderRadius: '8px',
                        fontFamily: 'Montserrat',
                        boxShadow: '0',
                        marginBottom: '12px',
                        lineHeight: '24px', display: 'flex',
                        justifyContent: 'normal',
                    }}
                    onClick={openEmailLogin}
                />
            }
            <InputFieldsForAuth
                isOpen={emailAcc}
                label={'Continue with email'}
                loginValue={formik.values.email}
                passwordValue={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onSubmit={formik.handleSubmit}
            />
            {
                visibleButtons === 'testAcc' ||
                <CustomButton
                    color={'inherit'}
                    label={'Use a test account'}
                    icon={<div className={s.icon}><Icon id={'testAccount'}/></div>}
                    variant={'contained'}
                    sx={{
                        backgroundColor: '#EFE3FF',
                        width: '328px',
                        height: '56px',
                        fontSize: '16px',
                        textTransform: 'none',
                        color: '#000000',
                        fontWeight: 500,
                        borderRadius: '8px',
                        fontFamily: 'Montserrat',
                        boxShadow: '0',
                        marginBottom: '32px',
                        padding: '16px',
                        lineHeight: '24px',
                        display: 'flex',
                        justifyContent: 'normal',
                    }}
                    onClick={openTestAcc}
                />
            }
            <InputFieldsForAuth
                isOpen={testAcc}
                label={'Use a test account'}
                testAccChildren={<>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </>}
                loginValue={formik.values.email}
                passwordValue={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onSubmit={formik.handleSubmit}
            />
            <CustomButton
                color={'inherit'}
                label={'Is it your first time?'}
                additionalLabel={<p className={s.labelForButton}>Sign up</p>}
                variant={'contained'}
                sx={{
                    backgroundColor: '#704ECC',
                    width: '328px',
                    height: '56px',
                    fontSize: '16px',
                    textTransform: 'none',
                    color: '#FFFFFF',
                    fontWeight: 500,
                    borderRadius: '8px',
                    fontFamily: 'Montserrat',
                    boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                    lineHeight: '34px',
                    marginBottom: '108px',
                }}
            />
        </div>
    )
}
