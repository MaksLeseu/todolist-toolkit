import React, {FC, useState} from "react";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {TodolistFilterType} from "../../../features/Todolists/todolists.types";
import Box from "@mui/material/Box";
import {TriangleIcon} from "../Icons/TriangleIcon";
import {CustomButton} from "../CustomButton/CustomButton";
import {GroupingIcon} from "../Icons/GroupingIcon";
import {SortingIcon} from "../Icons/SortingIcon";
import {MenuDownIcon} from "../Icons/MenuDownIcon";
import {TaskGrouping} from "./TaskGrouping/TaskGrouping";
import {MenuUpIcon} from "../Icons/MenuUpIcon";
import {MSG_BTN} from "../../utils/constans/app-messages.const";

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
    '&:hover': {
        backgroundColor: 'secondary.main',
        color: 'common.white',
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
    '&:hover': {
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

    const [isOpenWindow, setIsOpenWindow] = useState<{ grouping: AnchorElType, sorting: AnchorElType }>({
        grouping: null,
        sorting: null,
    })

    const openCloseWindow = (action: 'close' | 'open', params?: 'group' | 'sort', event?: React.MouseEvent<Element, MouseEvent>) => {
        if (action === 'close') {
            setIsOpenWindow({
                grouping: null,
                sorting: null,
            })
        } else if (event && params) {
            const methodForOpen = {
                ['group']: () => {
                    setIsOpenWindow({
                        grouping: event.currentTarget,
                        sorting: null,
                    })
                },
                ['sort']: () => {
                    setIsOpenWindow({
                        grouping: null,
                        sorting: event.currentTarget,
                    })
                }
            }
            methodForOpen[params]()
        }
    }

    const setActiveStylesButtons = (params: 'group' | 'sort') => {
        const activeStyles = {
            backgroundColor: 'secondary.main',
            color: 'primary.main',
            '& svg path': {
                fill: 'white',
            },
        }

        const returnStyles = {
            ['group']: () => {
                return isOpenWindow.grouping ? activeStyles : null
            },
            ['sort']: () => {
                return isOpenWindow.sorting ? activeStyles : null
            },
        }

        return returnStyles[params]()
    }

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

    const buttonActiveStylesTaskGrouping: object | null = setActiveStylesButtons('group')
    const buttonActiveStylesTaskSorting: object | null = setActiveStylesButtons('sort')

    const activeStylesAll: object | null = setActiveStylesTaskGrouping('all')
    const activeStylesCompleted: object | null = setActiveStylesTaskGrouping('completed')
    const activeStylesActive: object | null = setActiveStylesTaskGrouping('active')

    const tasksFiltering = (filter: TodolistFilterType) => {
        changeTodolistsFilterHandler(filter)
        openCloseWindow('close')
    }

    return (
        <CustomPopover
            anchorEl={openDisplay}
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
                    height: '72px',
                    borderRadius: '4px',
                    padding: '8px 13px 7px 9px',
                }}>
                    <CustomButton
                        label={'Task grouping'}
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
                                    isOpenWindow.grouping ? <MenuUpIcon styles={{width: 16, height: 16}}/>
                                        : <MenuDownIcon
                                            styles={{width: 16, height: 16}}
                                        />
                                }

                            </Box>
                        }
                        onClick={(event) => openCloseWindow('open', 'group', event)}
                    />
                    <CustomButton
                        label={'Task sorting '}
                        variant={'text'}
                        sx={{
                            ...buttonStyles,
                            ...buttonActiveStylesTaskSorting,
                        }}
                        icon={<Box sx={{height: '16px',}}><SortingIcon/></Box>}
                        iconFromTheEnd={
                            <Box
                                sx={{height: '16px'}}
                            >
                                {
                                    isOpenWindow.sorting ? <MenuUpIcon styles={{width: 16, height: 16}}/>
                                        : <MenuDownIcon
                                            styles={{width: 16, height: 16}}
                                        />
                                }
                            </Box>
                        }
                        onClick={(event) => openCloseWindow('open', 'sort', event)}
                    />
                </Box>
                <TaskGrouping
                    openTaskGrouping={isOpenWindow.grouping}
                    valueTodoFilter={valueTodoFilter}
                    transformPopover={'translate(45%, 0%)'}
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
                    changeTodolistsFilterHandler={changeTodolistsFilterHandler}
                    handleCloseTaskGrouping={() => openCloseWindow('close')}
                />
                <TaskGrouping
                    openTaskGrouping={isOpenWindow.sorting}
                    valueTodoFilter={valueTodoFilter}
                    transformPopover={'translate(45%, 0%)'}
                    sx={{width: '168px', height: '134px',}}
                    children={
                        <>
                            <CustomButton
                                label={'Sort by name'}
                                variant={'outlined'}
                                sx={{
                                    ...buttonTaskGroupingStyles,
                                    width: '152px',
                                }}
                                onClick={() => {
                                }}
                            />

                            <CustomButton
                                label={'Sort by creation date'}
                                variant={'outlined'}
                                sx={{
                                    ...buttonTaskGroupingStyles,
                                    width: '152px',
                                }}
                                onClick={() => {
                                }}
                            />

                            <CustomButton
                                label={'Sort by deadline'}
                                variant={'outlined'}
                                sx={{
                                    ...buttonTaskGroupingStyles,
                                    width: '152px',
                                }}
                                onClick={() => {
                                }}
                            />

                            <CustomButton
                                label={'Sort by priority'}
                                variant={'outlined'}
                                sx={{
                                    ...buttonTaskGroupingStyles,
                                    width: '152px',
                                    margin: 0,
                                }}
                                onClick={() => {
                                }}
                            />
                        </>
                    }
                    changeTodolistsFilterHandler={() => {
                    }}
                    handleCloseTaskGrouping={() => openCloseWindow('close')}
                />
            </>
        </CustomPopover>
    )
}