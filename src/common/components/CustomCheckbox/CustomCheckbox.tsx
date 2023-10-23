import React, {ChangeEvent, FC, SyntheticEvent} from "react";
import Checkbox from "@mui/material/Checkbox";

type Props = {
    checked: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CustomCheckbox: FC<Props> = ({checked, onChange}) => {
    return (
        <Checkbox
            checked={checked}
            onChange={onChange}
            onClick={(e: MouseEvent | SyntheticEvent) => e.stopPropagation()}
        />
    )
}