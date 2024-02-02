import React, {FC, MouseEventHandler} from "react";
import {CustomButton} from "../CustomButton/CustomButton";
import {Typography} from "@mui/material";
import {CustomPopover} from "../CustomPopover/CustomPopover";
import {TriangleIcon} from "../Icons/TriangleIcon";
import Box from "@mui/material/Box";

type Props = {
    isOpen: any
    title: string
    description?: string
    transformConfirmation?: string
    transformPopover?: string
    titleStyles?: any
    conformationStyles?: any
    actionConfirmation: MouseEventHandler | undefined
    closeConfirmation: MouseEventHandler | undefined
}

const buttonStyles = {
    width: '68px',
    height: '24px',
    borderRadius: '2px',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '16px',
    color: 'secondary.main',
    padding: 0,
    display: 'block',
    margin: '0 auto',
    '&:hover': {
        backgroundColor: 'secondary.main',
        color: 'text.secondary',
    }
}

export const ConfirmationModalWindow: FC<Props> = (props) => {
    const {
        isOpen,
        title,
        transformConfirmation,
        transformPopover,
        titleStyles,
        conformationStyles,
        closeConfirmation,
        actionConfirmation
    } = props

    return (
        <CustomPopover
            anchorEl={isOpen}
            transformStyle={transformPopover ? transformPopover : 'translate(-43%, -5%)'}
            handleClosePopover={closeConfirmation}
        >
            <>
                <Box sx={{
                    transform: transformConfirmation ? transformConfirmation : 'translate(89%, 27%)',
                }}>
                    <TriangleIcon/>
                </Box>
                <Box sx={{
                    backgroundColor: '#EFE3FF',
                    width: '190px',
                    height: '110px',
                    borderRadius: '4px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    ...conformationStyles
                }}>
                    <Typography sx={{
                        color: '#704ECC',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '16px',
                        width: '139px',
                        margin: '0 auto 8px auto',
                        ...titleStyles
                    }} component="div">{title}</Typography>
                    <CustomButton
                        label={'Yes, sure'}
                        variant={'text'}
                        sx={{
                            ...buttonStyles,
                            margin: '0 auto 6px auto',
                        }}
                        onClick={actionConfirmation}
                    />
                    <CustomButton
                        label={'Cancel'}
                        variant={'text'}
                        sx={{
                            ...buttonStyles,
                        }}
                        onClick={closeConfirmation}
                    />
                </Box>
            </>
        </CustomPopover>
    );
};