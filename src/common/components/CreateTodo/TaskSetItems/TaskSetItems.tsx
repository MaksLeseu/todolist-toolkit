import React, {FC, MouseEventHandler} from 'react';
import Box from "@mui/material/Box";
import {CustomIconButton} from "../../CustomIconButton/CustomIconButton";
import {MenuDownIcon} from "../../Icons/MenuDownIcon";

type Props = {
    title: string
    children: any
    handleOpen: MouseEventHandler | undefined
}

export const TaskSetItems: FC<Props> = (props) => {
    const {title, children, handleOpen} = props

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
            }}>
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
                        height: '24px', objectFit: 'cover'
                    }}>
                        <MenuDownIcon/>
                    </Box>
                </CustomIconButton>
            </Box>
            {children}
        </Box>
    );
};