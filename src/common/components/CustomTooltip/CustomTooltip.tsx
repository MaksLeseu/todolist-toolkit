import React, {FC, ReactElement} from "react";
import Tooltip from "@mui/material/Tooltip";

type Props = {
    title: React.ReactNode
    placement?:
        | 'bottom-end'
        | 'bottom-start'
        | 'bottom'
        | 'left-end'
        | 'left-start'
        | 'left'
        | 'right-end'
        | 'right-start'
        | 'right'
        | 'top-end'
        | 'top-start'
        | 'top'
    children: ReactElement
}

export const CustomTooltip: FC<Props> = (props) => {
    const {title, placement = 'right-start', children} = props

    return (
        <Tooltip title={title} placement={placement} arrow>
            {children}
        </Tooltip>
    )
}