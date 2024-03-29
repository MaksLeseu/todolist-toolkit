import React, {FC, ReactNode} from "react";
import Popover from '@mui/material/Popover';
import {PopoverOrigin} from "@mui/material/Popover/Popover";
import {Optional} from "../../utils/types/optional.types";

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
    listItemStyles?: any
    transformStyle?: string
    anchorOrigin?: PopoverOrigin
    handleClosePopover: any
    children: ReactNode
}

export const CustomPopover: FC<Props> = (props) => {
    const {anchorEl, children, listItemStyles, transformStyle, anchorOrigin, handleClosePopover} = props

    const open = Boolean(anchorEl);
    const id: Optional<string> = open ? 'simple-popover' : undefined;

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
                    transform: transformStyle,
                    ...listItemStyles
                },
            }}
        >
            {children}
        </Popover>
    )
}

