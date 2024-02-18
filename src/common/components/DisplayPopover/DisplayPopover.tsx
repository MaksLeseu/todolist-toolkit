import React, {FC, useState} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {TodolistFilterType} from "../../../features/Todolists/todolists.types";
import Box from "@mui/material/Box";
import {TriangleIcon} from "../Icons/TriangleIcon";
import {CustomButton} from "../CustomButton/CustomButton";
import {GroupingIcon} from "../Icons/GroupingIcon";
import {MenuDownIcon} from "../Icons/MenuDownIcon";
import {TaskGrouping} from "./TaskGrouping/TaskGrouping";
import {MenuUpIcon} from "../Icons/MenuUpIcon";
import {MSG_BTN} from "../../utils/constans/app-messages.const";
import {useMediaQuery} from "@mui/material";
import {Nullable} from "../../utils/types/optional.types";

type Props = {
    openDisplay: AnchorElType
    valueTodoFilter: TodolistFilterType
    transformPopover?: string
    transformMoreHoriz?: string
    handleCloseDisplay: (event: React.MouseEvent<HTMLButtonElement>) => void
    changeTodolistsFilterHandler: (filter: TodolistFilterType) => void
}

const generalButtonsStyles = {
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '16px',
    color: 'secondary.main',
    padding: '4px 8px',
}

const buttonStyles = {
    width: '138px',
    height: '28px',
    borderRadius: '2px',
    marginBottom: '1px',
    textAlign: 'center',
    display: 'grid',
    gridTemplateColumns: '20px 92px 16px',
    transition: 'all 0.6s',
    '&:hover': {
        transition: 'all 0.6s',
        backgroundColor: 'secondary.main',
        color: 'text.secondary',
        '& svg path': {
            fill: 'white',
        },
    },
    ...generalButtonsStyles
}

const buttonTaskGroupingStyles = {
    width: '146px',
    height: '27px',
    display: 'flex',
    justifyContent: 'start',
    marginBottom: '2px',
    transition: 'all 0.6s',
    '&:hover': {
        transition: 'all 0.6s',
        backgroundColor: 'secondary.main',
        color: 'primary.main'
    },
    ...generalButtonsStyles
}

export const DisplayPopover: FC<Props> = (props) => {
    const {
        openDisplay,
        valueTodoFilter,
        transformPopover,
        transformMoreHoriz,
        handleCloseDisplay,
        changeTodolistsFilterHandler
    } = props

    const [isOpen, setIsOpen] = useState<AnchorElType>(null)

    const openWindow = (event: React.MouseEvent<Element, MouseEvent>) => setIsOpen(event.currentTarget)
    const closeWindow = () => setIsOpen(null)

    const setActiveStylesTaskGrouping = (params: 'all' | 'completed' | 'active') => {
        const activeStyles = {
            backgroundColor: 'secondary.main',
            color: 'primary.main',
        }

        const returnStyles = {
            ['all']: () => {
                return valueTodoFilter === 'all' ? activeStyles : null
            },
            ['completed']: () => {
                return valueTodoFilter === 'completed' ? activeStyles : null
            },
            ['active']: () => {
                return valueTodoFilter === 'active' ? activeStyles : null
            },
        }

        return returnStyles[params]()
    }

    const buttonActiveStylesTaskGrouping: Nullable<object> = isOpen ?
        {
            backgroundColor: 'secondary.main',
            color: 'primary.main',
            '& svg path': {
                fill: 'white',
            },
        }
        : null

    const activeStylesAll: Nullable<object> = setActiveStylesTaskGrouping('all')
    const activeStylesCompleted: Nullable<object> = setActiveStylesTaskGrouping('completed')
    const activeStylesActive: Nullable<object> = setActiveStylesTaskGrouping('active')

    const tasksFiltering = (filter: TodolistFilterType) => {
        changeTodolistsFilterHandler(filter)
        closeWindow()
    }

    const matches1130 = useMediaQuery('(max-width:1130px)');

    return (
        <CustomPopover
            anchorEl={openDisplay}
            listItemStyles={{background: 'none',}}
            transformStyle={transformPopover ? transformPopover : 'translate(-0%, -2%)'}
            handleClosePopover={handleCloseDisplay}
        >
            <>
                <Box sx={{
                    transform: transformMoreHoriz ? transformMoreHoriz : 'translate(4%, 28%)',
                }}>
                    <TriangleIcon/>
                </Box>
                <Box sx={{
                    backgroundColor: '#EFE3FF',
                    width: '160px',
                    height: '100%',
                    borderRadius: '4px',
                    padding: '8px 13px 7px 9px',
                }}>
                    <CustomButton
                        label={MSG_BTN.TASK_GROUPING}
                        variant={'text'}
                        sx={{
                            ...buttonStyles,
                            ...buttonActiveStylesTaskGrouping,
                        }}
                        icon={<Box sx={{height: '16px',}}><GroupingIcon/></Box>}
                        iconFromTheEnd={
                            <Box
                                sx={{height: '16px'}}
                            >
                                {
                                    isOpen ? <MenuUpIcon styles={{width: 16, height: 16}}/>
                                        : <MenuDownIcon
                                            styles={{width: 16, height: 16}}
                                        />
                                }

                            </Box>
                        }
                        onClick={openWindow}
                    />
                </Box>
                <TaskGrouping
                    openTaskGrouping={isOpen}
                    transformPopover={matches1130 ? 'translate(-7%, 0%)' : 'translate(45%, 0%)'}
                    children={
                        <>
                            <CustomButton
                                label={MSG_BTN.ALL_TASKS}
                                variant={'outlined'}
                                sx={{
                                    ...buttonTaskGroupingStyles,
                                    ...activeStylesAll,
                                }}
                                onClick={() => tasksFiltering('all')}
                            />

                            <CustomButton
                                label={MSG_BTN.ONLY_COMPLETED_TASKS}
                                variant={'outlined'}
                                sx={{
                                    ...buttonTaskGroupingStyles,
                                    ...activeStylesCompleted,
                                }}
                                onClick={() => tasksFiltering('completed')}
                            />

                            <CustomButton
                                label={MSG_BTN.ONLY_NOT_COMPLETED_TASKS}
                                variant={'outlined'}
                                sx={{
                                    ...buttonTaskGroupingStyles,
                                    ...activeStylesActive,
                                    margin: 0,
                                }}
                                onClick={() => tasksFiltering('active')}
                            />
                        </>
                    }
                    handleCloseTaskGrouping={closeWindow}
                />
            </>
        </CustomPopover>
    )
}