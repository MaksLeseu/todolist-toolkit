import React, {useEffect} from 'react';
import {useAppDispatch} from "../common/utils/hooks/useAppDispatch";
import {authThunk} from "../features/Auth/auth.slice";
import {Router} from "../routes/Routes";


export const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authThunk.authMe({}))
    }, [])

    return <Router/>
}


/*return (
    <BrowserRouter>
        <div>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Todolists onClickLink={false}/>}/>
                <Route path={'/login'} element={<Auth/>}/>
                <Route path={'/todo/:todo/!*'} element={<Todolists onClickLink={true}/>}/>
            </Routes>
        </div>
    </BrowserRouter>
);*/
