import React from 'react';
import {CustomButton} from "../CustomButton/CustomButton";
import {Page404IconLight} from "../Icons/Page404IconLight";
import {NavLink} from "react-router-dom";
import s from './Page404.module.css'

export const Page404 = () => {
    return (
        <div className={s.container}>
            <div>
                <p className={s.label}>sorry,</p>
                <p className={s.title}>PAGE IS NOT FOUND</p>
            </div>
            <div className={s.containerButton}>
                <NavLink to={'/todolist-toolkit/todo'} className={s.link}>
                    <CustomButton
                        label={'Go to the main page'}
                        variant={'text'}
                        sx={{
                            width: '239px',
                            height: '50px',
                            fontSize: '18px',
                            fontWeight: 700,
                            lineHeight: '24px',
                            color: 'common.white',
                            backgroundColor: 'secondary.main',
                        }}
                    />
                </NavLink>
            </div>
            <Page404IconLight/>
        </div>
    );
};