import React from 'react';
import {StartPageIcon} from "../Icons/StartPageIcon";
import {CustomButton} from "../CustomButton/CustomButton";
import {Navigate, NavLink} from "react-router-dom";
import {useAppSelector} from "../../utils/hooks/useAppSelector";
import {isLoggedInSelector} from "../../../features/Auth/auth.selector";
import s from './StartPage.module.css'
import {BASE_ROUTE} from "../../../routes/Routes";

export const StartPage = () => {
    const isLoggedIn: boolean = useAppSelector(isLoggedInSelector)

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={s.startPage}>
            <div className={s.container}>
                <p className={s.title}>Welcome to</p>
                <p className={s.secondTitle}>TODAY!</p>
                <p className={s.text}>This is your best assistant
                    in planning your life.</p>
                <NavLink className={s.link} to={`${BASE_ROUTE}/login`}>
                    <CustomButton
                        color={'secondary'}
                        label={'Let’s Start!'}
                        variant={'contained'}
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                            fontSize: '24px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '34px',
                            '@media (max-width: 510px)': {
                                fontSize: '16px',
                            },
                        }}
                    />
                </NavLink>
            </div>
            <div className={s.imageContainer}>
                <StartPageIcon/>
            </div>
        </div>
    );
};