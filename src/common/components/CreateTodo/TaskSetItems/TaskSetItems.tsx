import React, {FC, MouseEventHandler} from 'react';
import Box from "@mui/material/Box";
import {CustomIconButton} from "../../CustomIconButton/CustomIconButton";
import {MenuDownIcon} from "../../Icons/MenuDownIcon";
import {dateConversionToString} from "../../../utils/functions/dateConversionToString/dateConversionToString";

type Props = {
    title: string
    value: any
    isOpen: any
    children: any
    handleOpen: MouseEventHandler | undefined
}

export const TaskSetItems: FC<Props> = (props) => {
    const {title, value, isOpen, children, handleOpen} = props

    const valueLabel = value ? dateConversionToString(value) : 'no date set'

    return (
        <Box sx={{
            marginBottom: '24px',
        }}>
            <Box sx={{
                width: '155px',
                color: 'rgba(0, 0, 0, 0.50)',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '24px',
                margin: '0 0 13px 0',
                borderBottom: '1px rgba(0, 0, 0, 0.50) solid',
            }}>
                {title}
            </Box>
            <Box sx={{
                width: '540px',
                borderBottom: '1px solid #704ECC',
                paddingBottom: '4px',
                display: 'flex',
                '@media (max-width: 980px)': {
                    width: '440px',
                },
                '@media (max-width: 500px)': {
                    width: '340px',
                },
                '@media (max-width: 360px)': {
                    width: '300px',
                },
            }}>
                <Box
                    sx={{
                        marginRight: '4px',
                        color: 'rgba(112, 78, 204, 0.50)',
                        fontFamily: 'Roboto',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '24px',
                    }}
                >
                    {valueLabel}
                </Box>
                <CustomIconButton
                    disableRipple={false}
                    sx={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '2px',
                        objectFit: 'cover',
                    }}
                    onClick={handleOpen}
                >
                    <Box sx={{
                        width: '24px',
                        height: '24px',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        backgroundColor: isOpen ? '#EFE3FF' : 'none'
                    }}>
                        <MenuDownIcon/>
                    </Box>
                </CustomIconButton>
            </Box>
            {children}
        </Box>
    );
};