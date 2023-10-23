import React, {FC, ReactNode} from "react";
import Popover from '@mui/material/Popover';
import {ListItem} from "@mui/material";

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
    handleClosePopover: (event: React.MouseEvent<HTMLButtonElement>) => void
    children: ReactNode
}

export const CustomPopover: FC<Props> = (props) => {
    const {anchorEl, children, handleClosePopover} = props

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <ListItem sx={{display: 'block'}}>
                {children}
            </ListItem>
        </Popover>
    )
}

