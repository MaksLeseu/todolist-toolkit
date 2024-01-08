import React, {useEffect} from 'react';
import {useAppDispatch} from "../common/utils/hooks/useAppDispatch";
import {authThunk} from "../features/Auth/auth.slice";
import {Router} from "../routes/Routes";
import {Preloader} from "../common/components/Preloader/Preloader";
import {ThemeProvider} from "@mui/material";
import {useTheme} from "../common/utils/hooks/useTheme";
import {useAppSelector} from "../common/utils/hooks/useAppSelector";
import {isInitializedSelector, modeSelector} from "./app.selector";


export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(isInitializedSelector)
    const mode = useAppSelector(modeSelector)

    const {theme} = useTheme(mode)

    useEffect(() => {
        dispatch(authThunk.authMe({}))
    }, [dispatch])

    if (isInitialized) return <Preloader/>

    return (
        <ThemeProvider theme={theme}>
            <Router/>
        </ThemeProvider>
    )
}


