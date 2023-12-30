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
//Double buttons
export const CustomButtonGroup: FC<Props> = (props) => {
    const {firstButtonLabel, secondButtonLabel, size = 'medium', firstButtonOnClick, secondButtonOnClick} = props

    return (
        <div className={s.group}>
            <CustomButton
                color={'inherit'}
                label={firstButtonLabel}
                variant={'contained'}
                size={size}
                sx={{
                    borderRadius: '8px',
                    border: '1px solid var(--primary, #704ECC)',
                    boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
                    backgroundColor: 'common.white',
                    color: 'secondary.main',
                }}
                onClick={firstButtonOnClick}
            />
            <CustomButton
                color={'secondary'}
                label={secondButtonLabel}
                variant={'contained'}
                size={size}
                sx={{marginLeft: '10px', borderRadius: '8px',}}
                onClick={secondButtonOnClick}
            />
        </div>
    )
}