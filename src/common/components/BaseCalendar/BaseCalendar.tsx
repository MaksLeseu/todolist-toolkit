import React, {FC, ReactNode} from "react";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {Nullable} from "../../utils/types/optional.types";
import dayjs, {Dayjs} from "dayjs";

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                    {childrenResetButton}
                    <DateCalendar value={value} onChange={changeDate}/>
                </DemoContainer>
            </LocalizationProvider>
        </CustomPopover>
    )
}