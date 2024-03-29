import React, {FC, MouseEventHandler} from "react";
import s from './SettingsButton.module.css'
import {CustomButton} from "../../../../common/components/CustomButton/CustomButton";
import Divider from "@mui/material/Divider";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {MSG_BTN} from "../../../../common/utils/constans/app-messages.const";

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
                color={'secondary'}
                label={label || MSG_BTN.MISTAKES}
                variant={'contained'}
                sx={{
                    height: '30px',
                    textTransform: 'none',
                    boxShadow: 'none',
                    marginBottom: '10px',
                    marginRight: '10px',
                    minWidth: '140px',
                    ...sx
                }}
                onClick={handleOpen}
            />
            <Divider sx={{...sx}}/>
            {children}
        </div>
    )
}
