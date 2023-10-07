import React, {FC} from "react";
import s from './SettingsTaskEditor.module.css'
import {CustomButton} from "../../../../common/components/CustomButton/CustomButton";
import Divider from "@mui/material/Divider";

type Props = {
    title: string
    label: string
}

export const SettingsTaskEditor: FC<Props> = (props) => {
    const {title, label} = props

    return (
        <>
            <p className={s.title}>{title}</p>
            <CustomButton
                color={'inherit'}
                label={label}
                variant={'contained'}
                sx={{
                    width: '100%',
                    height: '25px',
                    textTransform: 'none',
                    boxShadow: 'none',
                    marginBottom: '10px'
                }}
            />
            <Divider/>
        </>
    )
}