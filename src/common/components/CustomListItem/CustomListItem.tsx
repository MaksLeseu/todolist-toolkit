import React, {FC, ReactElement} from "react";
import {ListItem} from "@mui/material";
import {Nullable} from "../../utils/types/optional.types";
import {CustomTooltip} from "../CustomTooltip/CustomTooltip";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

type Props = {
    disablePadding: boolean
    sx: SxProps<Theme>
    children: ReactElement
    titleTooltip: Nullable<string>
}

export const CustomListItem: FC<Props> = (props) => {
    const {disablePadding, sx, children, titleTooltip} = props

    return (
        <CustomTooltip title={titleTooltip}>
            <ListItem
                disablePadding={disablePadding}
                sx={sx}
            >
                {children}
            </ListItem>
        </CustomTooltip>
    )
}