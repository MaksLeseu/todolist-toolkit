import React, {useEffect} from 'react';
import {useAppDispatch} from "../common/utils/hooks/useAppDispatch";
import {authThunk} from "../features/Auth/auth.slice";
import {Router} from "../routes/Routes";


export const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authThunk.authMe({}))
    }, [dispatch])

    return <Router/>
}
