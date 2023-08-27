import React, {FC} from "react";
import Modal from '@mui/material/Modal';
import {Box, Typography} from "@mui/material";

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
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}