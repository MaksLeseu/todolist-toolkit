import React, {FC, ReactElement} from "react";
import {ListItem} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

type Props = {
    disablePadding: boolean
    sx: Object
    children: ReactElement
    titleTooltip: string | null
}

export const CustomListItem: FC<Props> = (props) => {
    const {disablePadding, sx, children, titleTooltip} = props

    return (
        <Tooltip title={titleTooltip} placement="right-start" arrow>
            <ListItem
                disablePadding={disablePadding}
                sx={sx}
            >
                {children}
            </ListItem>
        </Tooltip>
    )
}