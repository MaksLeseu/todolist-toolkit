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
    display: 'none',
}))

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
            handleClosePopover={closeCalendar}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                    {childrenResetButton}
                    <DateCalendar
                        value={value}
                        sx={{
                            width: '208px',
                            maxHeight: '200px',
                            borderRadius: '2px',
                            backgroundColor: '#EFE3FF',
                            /*boxShadow: '1px 1px 6px 0px rgba(112, 78, 204, 0.30), 1px 0px 6px 0px rgba(112, 78, 204, 0.30)',*/
                            padding: '4px 8px 4px 8px',
                        }}
                        slots={{
                            day: StyledDay,
                            calendarHeader: StyledCalendarHeader,
                        }}
                        slotProps={{
                            day: {color: 'red'}
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
