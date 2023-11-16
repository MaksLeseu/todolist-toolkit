import React, {FC, MouseEventHandler} from "react";
import s from "./CustomButtonGroup.module.css";
import {CustomButton} from "../CustomButton/CustomButton";

type Props = {
    firstButtonLabel: string
    secondButtonLabel: string
    size?: 'small' | 'medium' | 'large'
    firstButtonOnClick: MouseEventHandler | undefined
    secondButtonOnClick: MouseEventHandler | undefined
}

export const CustomButtonGroup: FC<Props> = (props) => {
    const {firstButtonLabel, secondButtonLabel, size = 'medium', firstButtonOnClick, secondButtonOnClick} = props

    return (
        <div className={s.group}>
            <CustomButton
                color={'inherit'}
                label={firstButtonLabel}
                variant={'contained'}
                size={size}
                onClick={firstButtonOnClick}
            />
            <CustomButton
                color={'primary'}
                label={secondButtonLabel}
                variant={'contained'}
                size={size}
                sx={{marginLeft: '10px'}}
                onClick={secondButtonOnClick}
            />
        </div>
    )
}