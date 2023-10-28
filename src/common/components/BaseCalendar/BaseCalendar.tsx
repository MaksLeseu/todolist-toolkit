import React, {FC} from "react";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import dayjs, {Dayjs} from "dayjs";

type Props = {
    openCalendar: AnchorElType
    closeCalendar: () => void
    settingDate: (date: dayjs.Dayjs | null) => void
}

export const BaseCalendar: FC<Props> = (props) => {
    const {openCalendar, closeCalendar, settingDate} = props

    const nowDate = new Date()
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(nowDate));

    settingDate(value)

    return (
        <CustomPopover
            anchorEl={openCalendar}
            handleClosePopover={closeCalendar}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                    <DateCalendar value={value} onChange={(newValue) => setValue(newValue)}/>
                </DemoContainer>
            </LocalizationProvider>
        </CustomPopover>
    )
}