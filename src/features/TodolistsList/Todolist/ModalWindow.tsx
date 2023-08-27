import React, {FC} from "react";
import Modal from '@mui/material/Modal';
import {Box, IconButton, Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

type ModalWindowPropsType = {
    open: boolean
    onClick: () => void
}

export const ModalWindow: FC<ModalWindowPropsType> = (props) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 3,
    };
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.onClick}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter a title for the task
                    </Typography>
                    <TextField
                        label={"Title"}
                        sx={{ mt: 2 }}
                        size={'small'}
                    />
                    <IconButton
                        color={"secondary"}
                        sx={{marginTop: '15px', marginLeft: '6px'}}
                    >
                        <ArrowCircleRightIcon />
                    </IconButton>
                </Box>
            </Modal>
        </>
    )
}