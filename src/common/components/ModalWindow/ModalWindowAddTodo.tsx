import React, {ChangeEvent, FC} from "react";
import {Box, Typography} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {CustomTextField} from "../CustomTextField/CustomTextField";
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";
import {CustomModalWindow} from "../CustomModalWindow/CustomModalWindow";

type ModalWindowPropsType = {
    title: string
    open: boolean
    changeTitle: (e: ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
    addTask: (title: string) => void
}

export const ModalWindowAddTodo: FC<ModalWindowPropsType> = (props) => {
    const {title, open, changeTitle, onClick, addTask} = props

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
            <CustomModalWindow
                open={open}
                onClose={onClick}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter a title for the task
                    </Typography>
                    <CustomTextField
                        label={"Title"}
                        size={'small'}
                        sx={{mt: 2}}
                        multiline={false}
                        value={title}
                        onChange={changeTitle}
                    />
                    <CustomIconButton
                        size={'medium'}
                        color={'success'}
                        disableRipple={false}
                        sx={{marginTop: '15px', marginLeft: '6px'}}
                        onClick={() => addTask(title)}
                    >
                        <ArrowCircleRightIcon/>
                    </CustomIconButton>

                    <CustomIconButton
                        size={'medium'}
                        color={'error'}
                        disableRipple={false}
                        sx={{marginTop: '15px', marginLeft: '3px'}}
                        onClick={onClick}
                    >
                        <CancelIcon/>
                    </CustomIconButton>
                </Box>
            </CustomModalWindow>
        </>
    )
}