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
    currentDate?: Nullable<Dayjs>
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
    },
    '&:hover.Mui-selected': {
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
    '& .MuiPickersCalendarHeader-switchViewButton': {
        width: '12px',
        height: '12px',
        color: 'white',
    },

    //switch icon
    '& .MuiPickersCalendarHeader-switchViewIcon': {
        width: '12px',
        height: '12px',
    },

    //arrow buttons (left and right)
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

    '&. MuiYearCalendar-root': {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
    }
}))

export const BaseCalendar: FC<Props> = (props) => {
    const {openCalendar, currentDate, transformStyle, childrenResetButton, closeCalendar, settingDate} = props
    const date = currentDate ? dayjs(currentDate) : dayjs(new Date())

    const [value, setValue] = React.useState<Nullable<Dayjs>>(date);

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
                    {childrenResetButton}
                </DemoContainer>
            </LocalizationProvider>
        </CustomPopover>
    )
}
