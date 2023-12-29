import React, {FC, ReactNode} from "react";
import {DateCalendar, PickersCalendarHeader, PickersDay,} from "@mui/x-date-pickers";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {Nullable} from "../../utils/types/optional.types";
import dayjs, {Dayjs} from "dayjs";
import {styled} from "@mui/material/styles";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import './BaseCalendar.css'
import {ArrowIconLeft} from "../Icons/ArrowIconLeft";
import {ArrowIconRight} from "../Icons/ArrowIconRight";


type Props = {
    openCalendar: AnchorElType
    transformStyle?: string
    childrenResetButton?: ReactNode
    closeCalendar: () => void
    settingDate: (date: Nullable<Dayjs>) => void
}

const StyledDay = styled(PickersDay)(({theme}) => ({
    minWidth: '24px',
    height: '24px',
    borderRadius: '2px',
    color: '#704ECC',
    textAlign: 'center',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    fontFamily: 'Roboto',
    '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
    },
    '&:focus.Mui-selected': {
        backgroundColor: theme.palette.secondary.main,
    }
}));
const StyledCalendarHeader = styled(PickersCalendarHeader)(({theme}) => ({
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '2px',
    width: '100%',
    height: '24px',
    position: 'relative',
    marginTop: '0px',
    padding: 0,
    marginBottom: 0,
    /*'& .css-1y9c4c5-MuiPickersCalendarHeader-labelContainer': {
        color: theme.palette.primary.main,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '20px',
        margin: '0 auto 0 40px',
    },*/

    '& .MuiPickersCalendarHeader-labelContainer': {
        color: theme.palette.primary.main,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '20px',
        margin: '0 auto 0 40px',
    },

    //switch button
    /*'& .css-oe4e7z-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton': {
        width: '12px',
        height: '12px',
        color: 'white',
    },*/
    '& .MuiPickersCalendarHeader-switchViewButton': {
        width: '12px',
        height: '12px',
        color: 'white',
    },
    //switch icon
    /*'& .css-1tkx1wf-MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon': {
        width: '12px',
        height: '12px',
    },*/
    '& .MuiPickersCalendarHeader-switchViewIcon': {
        width: '12px',
        height: '12px',
    },

    //right arrow button
    /*'& .css-ns7sn0-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button': {
        position: 'absolute',
        width: '25px',
        height: '25px',
        color: 'white',
        top: '10%',
        right: 0,
        '&.css-ns7sn0-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button svg': {
            position: 'absolute',
            right: '4px',
        }
    },

    //left arrow button
    '& .css-1ygssq1-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button': {
        position: 'absolute',
        width: '25px',
        height: '25px',
        color: 'white',
        top: '10%',
        left: 0,
        '&.css-1ygssq1-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button svg': {
            position: 'absolute',
            left: '4px',
        },
    },*/

    '& .MuiPickersArrowSwitcher-button': {
        position: 'absolute',
        width: '25px',
        height: '25px',
        color: 'white',
        top: '10%',
        '&:first-child': {
            left: 0,
        },
        '&:last-child': {
            right: 0,
        },
    },

    /*'& .css-1vs7z2v-MuiYearCalendar-root': {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },*/

    '&. MuiYearCalendar-root': {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
    }

}))

export const BaseCalendar: FC<Props> = (props) => {
    const {openCalendar, transformStyle, childrenResetButton, closeCalendar, settingDate} = props

    const [value, setValue] = React.useState<Nullable<Dayjs>>(dayjs(new Date()));

    const changeDate = (newValue: any) => {
        setValue(newValue)
        settingDate(newValue)
    }

    return (
        <CustomPopover
            anchorEl={openCalendar}
            transformStyle={transformStyle ? transformStyle : 'translate(-46%, 0%)'}
            listItemStyles={{
                width: '208px',
                borderRadius: '2px',
                backgroundColor: '#EFE3FF',
                padding: '4px 8px 4px 8px',
                boxShadow: '1px 1px 6px 0px rgba(112, 78, 204, 0.30), 1px 0px 6px 0px rgba(112, 78, 204, 0.30)',
            }}
            handleClosePopover={closeCalendar}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                    {childrenResetButton}
                    <DateCalendar
                        value={value}
                        sx={{
                            width: '100%',
                            maxHeight: '220px',
                        }}
                        slots={{
                            day: StyledDay,
                            calendarHeader: StyledCalendarHeader,
                            leftArrowIcon: () => <ArrowIconLeft/>,
                            rightArrowIcon: () => <ArrowIconRight/>,
                        }}
                        slotProps={{
                            leftArrowIcon: {}
                        }}
                        yearsPerRow={4}
                        onChange={changeDate}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </CustomPopover>
    )
}
