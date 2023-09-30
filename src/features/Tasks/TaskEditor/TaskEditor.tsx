import React, {FC} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import Modal from "@mui/material/Modal";
import s from './TaskEditor.module.css'
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    taskName: string
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
    const {taskName, description, taskEditor, closeTaskEditor} = props

    return (
        <>
            <Modal
                open={taskEditor}
            >
                <Box sx={style}>
                    <div className={s.closeButton}>
                        <IconButton onClick={closeTaskEditor}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <Box sx={{padding: '10px 20px 20px 20px'}}>
                        <div className={s.container}>
                            <Checkbox/>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {taskName}
                            </Typography>
                        </div>
                        <p className={s.description}>{description}</p>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}