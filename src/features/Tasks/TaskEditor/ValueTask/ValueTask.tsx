import React, {ChangeEvent, FC} from "react";
import {CustomTextField} from "../../../../common/components/CustomTextField/CustomTextField"
import s from './ValueTask.module.css'

type Props = {
    value: string
    label: string
    placement: "right-start" | "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end" | "top-start" | undefined
    taskRedactor: boolean
    className: string
    multiline: boolean
    sx: Object
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
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