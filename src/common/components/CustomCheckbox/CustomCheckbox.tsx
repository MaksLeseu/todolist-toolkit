import React, {ChangeEvent, FC, SyntheticEvent} from "react";
import Checkbox from "@mui/material/Checkbox";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material";

type Props = {
    checked: boolean
    name?: string
    sx?: SxProps<Theme>
    disableRipple?: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CustomCheckbox: FC<Props> = (props) => {
    const {checked, name, sx, disableRipple, onChange} = props

    return (
        <Checkbox
            checked={checked}
            name={name}
            sx={sx}
            disableRipple={disableRipple}
            onChange={onChange}
            onClick={(e: MouseEvent | SyntheticEvent) => e.stopPropagation()}
        />
    )
}