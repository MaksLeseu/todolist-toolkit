import React, {FC, useState} from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";
import {TaskPopover} from "../TaskPopover/TaskPopover";
import Box from "@mui/material/Box";
import {TriangleIcon} from "../Icons/TriangleIcon";
import {CustomButton} from "../CustomButton/CustomButton";
import {DeleteIcon} from "../Icons/DeleteIcon";
import {EditIcon} from "../Icons/EditIcon";
import {ConfirmationModalWindow} from "../СonfirmationModalWindow/СonfirmationModalWindow";

type Props = {
    taskId: string
    isOpen: any
    transformPopover?: string
    transformMoreHoriz?: string
    actionMoreHoriz: () => void
    closeMoreHoriz: () => void
}

type _Props = {
    taskId: string
    taskTitle: string
    removeTask: () => void
    openTaskRedactor: () => void
}
export const _MoreHoriz: FC<_Props> = (props) => {
    const {taskId, taskTitle, removeTask, openTaskRedactor} = props

    const [anchorEl, setAnchorEl] = React.useState<AnchorElType>(null);

    const handleClosePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <CustomIconButton
                color={"inherit"}
                size={'small'}
                disableRipple={false}
                onClick={handleClick}
            >
                <MoreHorizIcon/>
            </CustomIconButton>
            <TaskPopover
                taskId={taskId}
                taskTitle={taskTitle}
                anchorEl={anchorEl}
                removeTask={removeTask}
                handleClosePopover={handleClosePopover}
                openTaskRedactor={openTaskRedactor}
            />
        </div>
    )
}

export const MoreHoriz: FC<Props> = (props) => {
    const {isOpen, transformPopover, transformMoreHoriz, actionMoreHoriz, closeMoreHoriz} = props

    const [isOpenConformation, setIsOpenConformation] = useState<HTMLButtonElement | null>(null)
    const closeConformation = () => setIsOpenConformation(null)
    const openConformation = (event: React.MouseEvent<HTMLButtonElement>) => setIsOpenConformation(event.currentTarget)

    return (
        <CustomPopover
            anchorEl={isOpen}
            transformStyle={transformPopover ? transformPopover : 'translate(-0%, -2%)'}
            handleClosePopover={closeMoreHoriz}
        >
            <>
                <Box sx={{
                    transform: transformMoreHoriz ? transformMoreHoriz : 'translate(4%, 28%)',
                }}>
                    <TriangleIcon/>
                </Box>
                <Box sx={{
                    backgroundColor: '#EFE3FF',
                    width: '95px',
                    height: '82px',
                    borderRadius: '4px',
                    padding: '12px 14px 13px 11px',
                }}>
                    <CustomButton
                        label={'Edit '}
                        variant={'text'}
                        sx={{
                            width: '65px',
                            height: '24px',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '16px',
                            color: 'secondary.main',
                            padding: '4px 8px 4px 8px',
                            margin: '0 auto'
                        }}
                        icon={<Box sx={{marginRight: '4px', marginTop: '4px'}}><EditIcon/></Box>}
                        onClick={actionMoreHoriz}
                    />
                    <Box sx={{
                        width: '57px',
                        height: '1px',
                        backgroundColor: 'secondary.main',
                        marginTop: '4px',
                        marginBottom: '4px',

                    }}></Box>
                    <CustomButton
                        label={'Delete'}
                        variant={'text'}
                        sx={{
                            width: '70px',
                            height: '24px',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '16px',
                            color: 'secondary.main',
                            padding: '4px 8px 4px 8px',
                        }}
                        icon={<Box sx={{marginRight: '4px', marginTop: '4px'}}><DeleteIcon/></Box>}
                        onClick={openConformation}
                    />
                    <ConfirmationModalWindow
                        isOpen={isOpenConformation}
                        title={'Are you sure you want to delete this task?'}
                        transformConfirmation={'translate(89%, 28%)'}
                        transformPopover={'translate(-58.5%, -4%)'}
                        titleStyles={{
                            fontSize: '12px',
                            color: 'common.black',
                            fontWeight: 600,
                            width: '142px',
                            textAline: 'center'
                        }}
                        conformationStyles={{
                            width: '203px',
                            height: '129px'
                        }}
                        actionConfirmation={() => {
                        }}
                        closeConfirmation={closeConformation}
                    />
                </Box>
            </>
        </CustomPopover>
    )
}