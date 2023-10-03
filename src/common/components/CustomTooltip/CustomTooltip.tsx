import React, {FC, ReactElement} from "react";
import Tooltip from "@mui/material/Tooltip";
import {Nullable} from "../../utils/types/optional.types";

type Props = {
    title: Nullable<string>
    children: ReactElement
}

export const CustomTooltip: FC<Props> = (props) => {
    const {title, children} = props

    return (
        <Tooltip title={title} placement="right-start" arrow>
            {children}
        </Tooltip>
    )
}