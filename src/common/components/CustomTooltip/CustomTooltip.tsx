import React, {FC, ReactElement} from "react";
import Tooltip from "@mui/material/Tooltip";
import {Nullable} from "../../utils/types/optional.types";

type Props = {
    title: Nullable<string>
    placement?: "right-start" | "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end" | "top-start"
    children: ReactElement
}

export const CustomTooltip: FC<Props> = (props) => {
    const {title, placement, children} = props

    return (
        <Tooltip title={title} placement={placement ? placement : 'right-start'} arrow>
            {children}
        </Tooltip>
    )
}