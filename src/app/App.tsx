import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../common/utils/hooks/useAppDispatch";
import {authThunk} from "../features/Auth/auth.slice";
import {Router} from "../routes/Routes";
import {Preloader} from "../common/components/Preloader/Preloader";
import {ThemeProvider} from "@mui/material";
import {useTheme} from "../common/utils/hooks/useTheme";


export const App = () => {
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {theme} = useTheme()

    useEffect(() => {
        setIsLoading(true)

        dispatch(authThunk.authMe({}))
            .finally(() => setTimeout(() => {
                setIsLoading(false)
            }, 1000))
    }, [dispatch])

    if (isLoading) return <Preloader/>

    return (
        <ThemeProvider theme={theme}>
            <Router/>
        </ThemeProvider>
    )
}


