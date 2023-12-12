import React, {FC, ReactNode} from "react";
import {
    DateCalendar,
    DatePickerToolbar,
    PickersActionBar,
    PickersCalendarHeader,
    PickersDay,
} from "@mui/x-date-pickers";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {Nullable} from "../../utils/types/optional.types";
import dayjs, {Dayjs} from "dayjs";
import {styled} from "@mui/material/styles";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {ArrowRight} from "@mui/icons-material";
import {Popper} from "@mui/material";
import TextField from "@mui/material/TextField";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import './BaseCalendar.css'
import {ArrowIconLeft} from "../Icons/ArrowIconLeft";
import {ArrowIconRight} from "../Icons/ArrowIconRight";
import Box from "@mui/material/Box";


type Props = {
    openCalendar: AnchorElType
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
        backgroundColor: '#704ECC',
        color: 'white',
    },
    '&:focus.Mui-selected': {
        backgroundColor: '#704ECC',
    }
}));
const StyledCalendarHeader = styled(PickersCalendarHeader)(({theme}) => ({
    backgroundColor: '#704ECC',
    borderRadius: '2px',
    width: '100%',
    height: '24px',
    position: 'relative',
    marginTop: '0px',
    '&.MuiPickersCalendarHeader-root button': {
        width: '25px',
        height: '25px',
        '&.css-ns7sn0-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button': {
            position: 'absolute',
            top: '10%',
            right: 0,
        },
        '&.css-1ygssq1-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button': {
            position: 'absolute',
            top: '10%',
            left: 0,
        }
    },
    '&.MuiPickersCalendarHeader-root div': {
        color: '#EFE3FF',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '20px',
    },
}))
const StyledLeftArrowIcon = styled(ArrowIconLeft)(({theme}) => ({}))
const StyledRightArrowIcon = styled(ArrowIconRight)(({theme}) => ({}))

const CustomLeftArrowIcon = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                left: '50%,',
                top: '10%',
            }}
        >
            <ArrowIconLeft/>
        </Box>
    )
}

export const BaseCalendar: FC<Props> = (props) => {
    const {openCalendar, childrenResetButton, closeCalendar, settingDate} = props

    const [value, setValue] = React.useState<Nullable<Dayjs>>(dayjs(new Date()));

    const changeDate = (newValue: any) => {
        setValue(newValue)
        settingDate(newValue)
    }

    return (
        <CustomPopover
            anchorEl={openCalendar}
            transformStyle={'translate(-46%, 0%)'}
            listItemStyles={{
                width: '208px',
                maxHeight: '240px',
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
                            /*boxShadow: '1px 1px 6px 0px rgba(112, 78, 204, 0.30), 1px 0px 6px 0px rgba(112, 78, 204, 0.30)',*/
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

                        onChange={changeDate}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </CustomPopover>
    )
}


const StyledActionBar = styled(PickersActionBar)(({theme}) => ({
    backgroundColor: 'red',
}))
const StyledArrowIcon = styled(ArrowRight)(({theme}) => ({
    display: 'none',
}))
const StyledPopper = styled(Popper)(({theme}) => ({
    width: '184px',
    height: '152px',
}))
const StyledToolbar = styled(DatePickerToolbar)(({theme}) => ({
    backgroundColor: 'red',
}))
const StyledTextField = styled(TextField)(({theme}) => ({
    backgroundColor: 'red',
}))
const StyledDesktopPaper = styled('div')(({theme}) => ({
    width: '184px',
    height: '152px',
    backgroundColor: '#EFE3FF',
}))


/*
const CustomPicker = () => {

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'))

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={value}
                sx={{
                    backgroundColor: '#EFE3FF',
                    borderRadius: '2px',
                }}
                slots={{
                    day: StyledDay,
                    calendarHeader: StyledCalendarHeader,
                    leftArrowIcon: StyledArrowIcon,
                    rightArrowIcon: StyledArrowIcon,
                    desktopPaper: StyledDesktopPaper,
                }}
            />
        </LocalizationProvider>
    );
};*/
