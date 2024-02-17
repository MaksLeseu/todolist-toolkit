import React, {FC, MouseEventHandler, ReactNode} from 'react';
import Box from "@mui/material/Box";
import {CustomIconButton} from "../../../common/components/CustomIconButton/CustomIconButton";
import {MenuDownIcon} from "../../../common/components/Icons/MenuDownIcon";
import {dateConversionToString} from "../../../common/utils/functions/dateConversionToString/dateConversionToString";
import {Nullable} from "../../../common/utils/types/optional.types";
import {Dayjs} from "dayjs";
import {
    priorityConversionToString
} from "../../../common/utils/functions/priorityConversionToString/priorityConversionToString";
import {useAppSelector} from "../../../common/utils/hooks/useAppSelector";
import {modeSelector} from "../../../app/app.selector";

type Props = {
    title: string
    valueDate?: Nullable<Dayjs>
    valuePriority?: number
    isOpen: any
    children: ReactNode
    handleOpen: MouseEventHandler | undefined
}

export const TaskSetItems: FC<Props> = (props) => {
    const {title, valueDate, valuePriority, isOpen, children, handleOpen} = props
    const mode = useAppSelector(modeSelector)

    const date = valueDate ? dateConversionToString(valueDate) : null
    const priority = valuePriority ? priorityConversionToString(valuePriority) : null

    const valueLabel = priority === null ? date || 'no date set' : priority

    return (
        <Box sx={{
            '@media (max-width: 500px)': {
                marginBottom: '15px'
            },
        }}>
            <Box sx={{
                width: '155px',
                color: mode === 'dark' ? 'text.secondary' : 'rgba(0, 0, 0, 0.50)',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '16px',
                margin: '0 0 13px 0',
                borderBottom: mode === 'dark' ? '1px #FFF solid' : '1px rgba(0, 0, 0, 0.50) solid',
                '@media (max-width: 980px)': {
                    width: '146.5px',
                },
            }}>
                {title}
            </Box>
            <Box sx={{
                width: '155px',
                paddingBottom: '4px',
                display: 'flex',
                '@media (max-width: 980px)': {
                    width: '146.5px',
                },
                '@media (max-width: 500px)': {
                    width: '150px',
                    borderBottom: mode === 'dark' ? '1px #FFF solid' : '1px #704ECC solid',
                },
            }}>
                <Box
                    sx={{
                        marginRight: '4px',
                        color: 'rgba(112, 78, 204, 0.50)',
                        fontFamily: 'Roboto',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 500,
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