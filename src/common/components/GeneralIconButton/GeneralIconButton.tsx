import React, {FC, MouseEventHandler, ReactNode} from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material";

type Props = {
    size?: "small" | "medium" | "large"
    color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
    disableRipple: boolean
    primary: string
    sx?: SxProps<Theme>
    textStyles?: SxProps<Theme>
    childrenIconFirstPosition?: ReactNode
    childrenIconSecondPosition?: ReactNode
    onClick: MouseEventHandler | undefined
}

export const GeneralIconButton: FC<Props> = (props) => {
    const {
        size,
        color,
        disableRipple,
        primary,
        textStyles,
        sx,
        childrenIconFirstPosition,
        childrenIconSecondPosition,
        onClick
    } = props

    return (
        <CustomIconButton
            size={size}
            color={color}
            sx={sx}
            disableRipple={disableRipple}
            onClick={onClick}
        >
            <ListItemButton
                sx={{height: '30px', borderRadius: '3px'}}
            >
                <ListItemIcon
                    sx={{display: 'flex', alignItems: 'center'}}
                >
                    {childrenIconFirstPosition}
                    <ListItemText
                        sx={{color: 'black', ...textStyles}}
                        primary={primary}
                    />
                    {childrenIconSecondPosition}
                </ListItemIcon>
            </ListItemButton>
        </CustomIconButton>
    )
}