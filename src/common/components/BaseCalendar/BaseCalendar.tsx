import React, {FC, ReactNode} from "react";
import {DatePicker,} from "@mui/x-date-pickers";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {Nullable} from "../../utils/types/optional.types";
import dayjs, {Dayjs} from "dayjs";
import {styled} from "@mui/material/styles";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";


type Props = {
    openCalendar: AnchorElType
    childrenResetButton?: ReactNode
    closeCalendar: () => void
    settingDate: (date: Nullable<Dayjs>) => void
}


export const BaseCalendar: FC<Props> = (props) => {
    const {openCalendar, childrenResetButton, closeCalendar, settingDate} = props

    const [value, setValue] = React.useState<Nullable<Dayjs>>(dayjs(new Date()));

    const changeDate = (newValue: Nullable<Dayjs>) => {
        setValue(newValue)
        settingDate(newValue)
    }

    return (
        <CustomPopover
            anchorEl={openCalendar}
            handleClosePopover={closeCalendar}
        >
            {/*<LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                    {childrenResetButton}
                    <DateCalendar
                        value={value}

                        onChange={changeDate}
                    />
                </DemoContainer>
            </LocalizationProvider>*/}
            <CustomPicker/>
        </CustomPopover>
    )
}

const StyledDay = styled('div')({
    width: '24px',
    height: '24px',
    borderRadius: '2px',
    backgroundColor: '#EFE3FF',
    // Дополнительные стили для дня
    // ...
});

const CustomPicker = () => {

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={value}
                sx={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#EFE3FF',
                    borderRadius: '2px',
                }}
                onChange={(newValue) => setValue(newValue)}
                slotProps={{}}
                slots={{
                    /*day: (dayProps) => (
                        /!*<StyledDay {...dayProps}>
                            {dayProps.day.date()}
                        </StyledDay>*!/
                    ),*/
                }}
            />
        </LocalizationProvider>
    );
};