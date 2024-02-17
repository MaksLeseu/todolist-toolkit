import {useFormik} from "formik";
import {authThunk} from "../../../features/Auth/auth.slice";
import {useAppDispatch} from "./useAppDispatch";

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

export const useAuth = () => {
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

    return {formik}
}