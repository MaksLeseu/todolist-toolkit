import React, {FC, ReactNode} from "react";
import Popover from '@mui/material/Popover';
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
    handleClosePopover: any
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
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    transform: 'translate(-43%, -5%)',
                },
            }}
        >
            {children}
        </Popover>
    )
}

