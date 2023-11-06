import React, {FC} from "react";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AnchorElType, CustomPopover} from "../CustomPopover/CustomPopover";
import {Nullable} from "../../utils/types/optional.types";
import dayjs, {Dayjs} from "dayjs";
import {CustomIconButton} from "../CustomIconButton/CustomIconButton";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

type Props = {
    openCalendar: AnchorElType
    closeCalendar: () => void
    settingDate: (date: Nullable<Dayjs>) => void
    resetDate?: () => void
}

export const BaseCalendar: FC<Props> = (props) => {
    const {openCalendar, closeCalendar, settingDate, resetDate} = props

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
                    <CustomIconButton
                        disableRipple={true}
                        color={'inherit'}
                        onClick={resetDate}
                    >
                        <ListItemButton
                            sx={{height: '30px', borderRadius: '3px'}}
                        >
                            <ListItemIcon
                                sx={{display: 'flex', alignItems: 'center'}}
                            >
                                <DoNotDisturbAltIcon/>
                                <ListItemText
                                    sx={{color: 'black', marginLeft: '10px'}}
                                    primary={'Reset date.'}
                                />
                            </ListItemIcon>
                        </ListItemButton>
                    </CustomIconButton>
                    <DateCalendar value={value} onChange={changeDate}/>
                </DemoContainer>
            </LocalizationProvider>
        </CustomPopover>
    )
}