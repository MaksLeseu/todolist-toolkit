import React, {FC, ReactNode} from "react";
import Popover from '@mui/material/Popover';
import {ListItem} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {PopoverOrigin} from "@mui/material/Popover/Popover";

interface PopoverVirtualElement {
    getBoundingClientRect: () => DOMRect;
    nodeType: Node['ELEMENT_NODE'];
}

export type AnchorElType = | null
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement);

type Props = {
    anchorEl: AnchorElType
    listItemStyles?: SxProps<Theme>
    anchorOrigin?: PopoverOrigin
    handleClosePopover: (event: React.MouseEvent<HTMLButtonElement>) => void
    children: ReactNode
}

export const CustomPopover: FC<Props> = (props) => {
    const {anchorEl, children, listItemStyles, anchorOrigin, handleClosePopover} = props

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={anchorOrigin ||
                {
                    vertical: 'bottom',
                    horizontal: 'left',
                }
            }
        >
            <ListItem sx={{display: 'flex', flexDirection: 'column', width: '100%', ...listItemStyles}}>
                {children}
            </ListItem>
        </Popover>
    )
}

