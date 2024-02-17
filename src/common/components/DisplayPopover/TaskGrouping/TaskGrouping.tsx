import React, {FC, ReactNode} from "react";
import {AnchorElType, CustomPopover} from "../../CustomPopover/CustomPopover";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

type Props = {
    openTaskGrouping: AnchorElType
    transformPopover?: `translate(${string}%, ${string}%)`
    children: ReactNode
    sx?: SxProps<Theme>
    handleCloseTaskGrouping: () => void
}

export const TaskGrouping: FC<Props> = (props) => {
    const {
        openTaskGrouping,
        transformPopover,
        children,
        sx,
        handleCloseTaskGrouping,
    } = props

    return (
        <CustomPopover
            anchorEl={openTaskGrouping}
            transformStyle={transformPopover ? transformPopover : 'translate(-0%, -2%)'}
            listItemStyles={{
                backgroundColor: '#EFE3FF',
                width: '164px',
                height: '100px',
                borderRadius: '4px',
                padding: '8px 13px 7px 9px',
                boxShadow: '2px 2px 6px 0px rgba(0, 0, 0, 0.25), -2px -2px 6px 0px rgba(0, 0, 0, 0.25)',
                ...sx,
            }}
            handleClosePopover={handleCloseTaskGrouping}
        >
            {children}
        </CustomPopover>
    )
}