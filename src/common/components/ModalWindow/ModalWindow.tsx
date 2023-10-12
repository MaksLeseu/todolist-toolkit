import React, {ChangeEvent, FC} from "react";
import {Box, Typography} from "@mui/material";
import {CustomTextField} from "../CustomTextField/CustomTextField";
import {CustomModalWindow} from "../CustomModalWindow/CustomModalWindow";
import {CustomButton} from "../CustomButton/CustomButton";

type ModalWindowPropsType = {
    value: string
    open: boolean
    changeTodoName: (e: ChangeEvent<HTMLInputElement>) => void
    closeModalWindow: () => void
    addTodo: () => void
}

export const ModalWindow: FC<ModalWindowPropsType> = (props) => {
    const {value, open, changeTodoName, closeModalWindow, addTodo} = props

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 3,
    };

    return (
        <CustomModalWindow
            open={open}
            onClose={closeModalWindow}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: '10px'}}>
                    Enter a title for the task
                </Typography>
                <CustomTextField
                    label={"To-do list name"}
                    size={'medium'}
                    variant={'filled'}
                    multiline={false}
                    value={value}
                    onChange={changeTodoName}
                />
                <div>
                    <CustomButton
                        color={'inherit'}
                        label={'Cancel'}
                        variant={'contained'}
                        sx={{marginTop: '25px', marginLeft: '6px'}}
                        onClick={closeModalWindow}
                    />
                    <CustomButton
                        color={'primary'}
                        label={'Add to-do'}
                        variant={'contained'}
                        sx={{marginTop: '25px', marginLeft: '6px'}}
                        onClick={addTodo}
                    />
                </div>
            </Box>
        </CustomModalWindow>
    )
}