import React, {FC, MouseEventHandler} from "react";
import s from './SettingsButton.module.css'
import {CustomButton} from "../../../../common/components/CustomButton/CustomButton";
import Divider from "@mui/material/Divider";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

type Props = {
    title: string
    sx?: SxProps<Theme>
    label: string | null
    children: any
    handleOpen: MouseEventHandler | undefined
}

export const SettingsButton: FC<Props> = (props) => {
    const {title, sx, label, children, handleOpen} = props

    return (
        <div>
            <p className={s.title}>{title}</p>
            <CustomButton
                color={'inherit'}
                label={label || 'Mistakes'}
                variant={'contained'}
                sx={{
                    width: '100%',
                    height: '25px',
                    textTransform: 'none',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    ...sx
                }}
                onClick={handleOpen}
            />
            <Divider/>
            {children}
        </div>
    )
}
