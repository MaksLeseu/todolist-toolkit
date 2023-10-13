import React, {FC, ReactElement} from "react";
import Modal from "@mui/material/Modal";

type Props = {
    open: boolean
    children: ReactElement
    onClose?: {
        bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
    }['bivarianceHack']
}

export const CustomModalWindow: FC<Props> = (props) => {
    const {open, children, onClose} = props

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            {children}
        </Modal>
    )
}