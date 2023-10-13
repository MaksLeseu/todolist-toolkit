import React, {FC, MouseEventHandler} from "react";
import {CustomTextField} from "../../../../common/components/CustomTextField/CustomTextField"
import s from './ValueTask.module.css'
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {OutlinedInputProps} from "@mui/material/OutlinedInput";

type Props = {
    value: string
    label: React.ReactNode
    placement: "right-start" | "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end" | "top-start" | undefined
    taskRedactor: boolean
    className: string
    multiline: boolean
    sx: SxProps<Theme>
    onChange: OutlinedInputProps['onChange']
    onClick: MouseEventHandler | undefined
}

export const ValueTask: FC<Props> = (props) => {
    const {value, label, sx, taskRedactor, className, multiline, onChange, onClick} = props

    return (
        <>
            {
                taskRedactor
                    ?
                    <CustomTextField
                        label={label}
                        value={value}
                        size={'small'}
                        multiline={multiline}
                        sx={sx}
                        onChange={onChange}
                    />
                    :
                    <p className={className === 'taskName' ? s.taskName : s.description}
                       onClick={onClick}
                    >
                        {value}
                    </p>
            }
        </>
    )
}