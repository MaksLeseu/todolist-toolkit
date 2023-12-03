import React, {FC, MouseEventHandler, ReactElement, ReactNode, SyntheticEvent} from "react";
import Modal from "@mui/material/Modal";
import s from './CustomModalWindow.module.css'
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import {Box} from "@mui/material";

type StyleObjectType = {
    width: number
    height: number
    bgcolor: string
    borderRadius: number
}

type Props = {
    open: boolean
    title: string
    styleObject: StyleObjectType
    children: ReactElement
    childrenIcon?: ReactNode
    childrenRedactor?: ReactNode
    onClose: MouseEventHandler | undefined
}

export const CustomModalWindow: FC<Props> = (props) => {
    const {open, title, styleObject, children, childrenIcon, childrenRedactor, onClose} = props

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        right: '28%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        ...styleObject
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            onClick={(e: MouseEvent | SyntheticEvent) => e.stopPropagation()}
        >
            <Box sx={style}>
                <div className={s.header}>
                    <div className={s.titleContainer}>
                        {childrenIcon}
                        <p className={s.title}>{title}</p>
                    </div>

                    <div>

                        {childrenRedactor}

                        <CustomIconButton
                            disableRipple={false}
                            color={'inherit'}
                            onClick={onClose}
                        >
                            <CloseIcon/>
                        </CustomIconButton>
                    </div>
                </div>
                <Divider/>
                {children}
            </Box>
        </Modal>
    )
}

