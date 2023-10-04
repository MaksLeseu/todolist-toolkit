import React from "react";
import s from './Preloader.module.css'


export const Preloader = () => {
    return (
        <div className={s.container}>
            <div className={s.containerPreloader}>
                <div className={s.preloader}></div>
                <div className={s.preloader}></div>
                <div className={s.preloader}></div>
                <div className={s.preloader}></div>
                <div className={s.preloader}></div>
            </div>
        </div>
    )
}