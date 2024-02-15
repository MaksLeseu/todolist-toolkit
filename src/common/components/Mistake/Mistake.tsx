import React, {FC} from 'react';
import s from './Mistake.module.css'
import {MistakeIcon} from "../Icons/MistakeIcon";

type Props = {
    isOpen: boolean
    errorTitle?: string
}

export const Mistake: FC<Props> = (props) => {
    const {isOpen, errorTitle = 'Title too long.'} = props

    return (
        <>
            {
                isOpen &&
                <div className={s.mistakeContainer}>
                    <MistakeIcon/>
                    <p className={s.mistake}>{errorTitle}</p>
                </div>
            }
        </>
    );
};