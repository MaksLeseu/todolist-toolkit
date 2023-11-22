import React, {ChangeEvent, FC, SyntheticEvent} from "react";
import Checkbox from "@mui/material/Checkbox";

type Props = {
    checked: boolean
    name?: string
    disableRipple?: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CustomCheckbox: FC<Props> = (props) => {
    const {checked, name, disableRipple, onChange} = props

    return (
        <Checkbox
            checked={checked}
            name={name}
            onChange={onChange}
            disableRipple={disableRipple}
            onClick={(e: MouseEvent | SyntheticEvent) => e.stopPropagation()}
        />
    )
}