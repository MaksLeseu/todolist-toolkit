import React, {FC, ReactNode} from "react";
import {AnchorElType, CustomPopover} from "../../CustomPopover/CustomPopover";
import {TodolistFilterType} from "../../../../features/Todolists/todolists.types";

type Props = {
    openTaskGrouping: AnchorElType
    valueTodoFilter: TodolistFilterType
    transformPopover?: `translate(${string}%, ${string}%)`
    children: ReactNode
    sx?: any
    handleCloseTaskGrouping: () => void
    changeTodolistsFilterHandler: (filter: TodolistFilterType) => void
}

export const TaskGrouping: FC<Props> = (props) => {
    const {
        openTaskGrouping,
        valueTodoFilter,
        transformPopover,
        children,
        sx,
        handleCloseTaskGrouping,
        changeTodolistsFilterHandler
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