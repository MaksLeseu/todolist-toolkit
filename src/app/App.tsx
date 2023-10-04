import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../common/utils/hooks/useAppDispatch";
import {authThunk} from "../features/Auth/auth.slice";
import {Router} from "../routes/Routes";
import {Preloader} from "../common/components/Preloader/Preloader";


export const App = () => {
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch(authThunk.authMe({}))
            .finally(() => setIsLoading(false))
    }, [dispatch])

    if (isLoading) return <Preloader/>

    return <Router/>
}
