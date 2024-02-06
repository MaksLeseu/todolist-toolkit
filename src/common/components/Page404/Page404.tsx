import React from 'react';
import {CustomButton} from "../CustomButton/CustomButton";
import {Page404IconLight} from "../Icons/Page404IconLight";
import {NavLink} from "react-router-dom";
import s from './Page404.module.css'
import {BASE_ROUTE} from "../../../routes/Routes";

export const Page404 = () => {
    return (
        <div className={s.container}>
            <div>
                <p className={s.label}>sorry,</p>
                <p className={s.title}>PAGE IS NOT FOUND</p>
            </div>
            <div className={s.containerButton}>
                <NavLink to={`${BASE_ROUTE}/todo`} className={s.link}>
                    <CustomButton
                        color={'secondary'}
                        variant={'contained'}
                        label={'Go to the main page'}
                        sx={{
                            width: '239px',
                            height: '50px',
                            fontSize: '18px',
                            fontWeight: 700,
                            lineHeight: '24px',
                            color: 'common.white',
                        }}
                    />
                </NavLink>
            </div>
            <div className={s.imgContainer}>
                <Page404IconLight/>
            </div>
        </div>
    );
};