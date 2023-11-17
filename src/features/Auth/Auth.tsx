import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch} from "../../common/utils/hooks/useAppDispatch";
import {authThunk} from "./auth.slice";
import s from './Auth.module.css'
import {CustomButton} from "../../common/components/CustomButton/CustomButton";
import {useAppSelector} from "../../common/utils/hooks/useAppSelector";
import {isLoggedInSelector} from "./auth.selector";
import {CustomTextField} from "../../common/components/CustomTextField/CustomTextField";
import {Navigate} from "react-router-dom";
import {Icon} from "../../common/components/Icon/Icon";

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

export const _Auth = () => {
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

    if (isLoggedIn) {
        return <Navigate to={'/todolist-toolkit'}/>
    }

    return (
        <Grid container justifyContent="center"
              sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px'}}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel sx={
                            {
                                border: '1px #2a3b5a solid',
                                borderRadius: '5px',
                                paddingRight: '5px',
                                paddingLeft: '5px',
                                boxShadow: '0px 0px 3px black',
                            }}
                        >
                            <p>
                                To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                            target={'_blank'}>here</a>
                            </p>
                            <p>
                                or use common test account credentials:
                            </p>
                            <p className={s.auth}>
                                Email: free@samuraijs.com
                            </p>
                            <p className={s.auth}>
                                Password: free
                            </p>
                        </FormLabel>
                        <FormGroup>
                            <CustomTextField
                                label={'Email'}
                                margin={'normal'}
                                name={'email'}
                                variant={'outlined'}
                                value={formik.values.email}
                                size={'medium'}
                                multiline={false}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.email && formik.errors.email &&
                                <p className={s.error}>{formik.errors.email}</p>
                            }
                            <CustomTextField
                                label={'Password'}
                                type={'password'}
                                margin={'normal'}
                                name={'password'}
                                variant={'outlined'}
                                value={formik.values.password}
                                size={'medium'}
                                multiline={false}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.password && formik.errors.password &&
                                <p className={s.error}>{formik.errors.password}</p>
                            }
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox
                                    {...formik.getFieldProps("rememberMe")}
                                    checked={formik.values.rememberMe}
                                />}
                            />
                            <CustomButton
                                type={'submit'}
                                color={'primary'}
                                label={'Login'}
                                variant={'contained'}
                            />
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}

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

    if (isLoggedIn) {
        return <Navigate to={'/todolist-toolkit'}/>
    }

    return (
        <div className={s.authContainer}>
            <h2>CHOOSE</h2>
            <p>the way you want to enter, please</p>
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
            />
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
            />
            <CustomButton
                color={'inherit'}
                label={'Is it your first time? Sign up'}
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
                }}
            />
        </div>
    )
}
