import React, {ChangeEvent, FC} from "react";
import Checkbox from "@mui/material/Checkbox";

type Props = {
    checked: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    stopPropagation?: (e: any) => void
}

export const CustomCheckbox: FC<Props> = ({checked, onChange}) => {
    const stopPropagation = (e: any) => e.stopPropagation()

    return (
        <Checkbox
            checked={checked}
            onChange={onChange}
            onClick={stopPropagation}
        />
    )
}