import React, {FC} from "react";
import {Box, Typography} from "@mui/material";
import s from './TaskEditor.module.css'
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import CloseIcon from '@mui/icons-material/Close';
import {CustomModalWindow} from "../../../common/components/CustomModalWindow/CustomModalWindow";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {CustomButton} from "../../../common/components/CustomButton/CustomButton";
import DescriptionIcon from "@mui/icons-material/Description";

type Props = {
    taskName: string
    todolistTitle: string
    description: string
    taskEditor: boolean
    closeTaskEditor: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
};

export const TaskEditor: FC<Props> = (props) => {
    const {taskName, description, todolistTitle, taskEditor, closeTaskEditor} = props

    return (
        <>
            <CustomModalWindow
                open={taskEditor}
            >
                <Box sx={style}>
                    <div className={s.closeButton}>
                        <div className={s.todoTitle}>
                            <DescriptionIcon color={'info'}/>
                            <p>{todolistTitle}</p>
                        </div>
                        <CustomIconButton disableRipple={false} onClick={closeTaskEditor}>
                            <CloseIcon/>
                        </CustomIconButton>
                    </div>
                    <Divider/>
                    <Box sx={{padding: '10px 20px 20px 20px', display: 'flex'}}>
                        <div className={s.columnDescription}>
                            <div className={s.container}>
                                <Checkbox/>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {taskName}
                                </Typography>
                            </div>
                            <p className={s.description}>{description}</p>
                        </div>
                        <div className={s.column}>
                            <p>Deadline</p>
                            <CustomButton
                                color={'inherit'}
                                label={'5 october'}
                                variant={'contained'}
                                sx={{
                                    width: '100%',
                                    height: '25px',
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    marginBottom: '10px'
                                }}
                            />
                            <Divider/>
                            <p>Priority</p>
                            <CustomButton
                                color={'inherit'}
                                label={'P4'}
                                variant={'contained'}
                                sx={{
                                    width: '100%',
                                    height: '25px',
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    marginBottom: '10px',
                                }}
                            />
                            <Divider/>
                        </div>
                    </Box>
                </Box>
            </CustomModalWindow>
        </>
    )
}