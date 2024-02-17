import {useState} from "react";
import {Nullable} from "../types/optional.types";
import {Dayjs} from "dayjs";
import {CalendarValues} from "../enums";

type DatesType = {
    startDate: Nullable<Dayjs>
    deadline: Nullable<Dayjs>
}

export const useSettingDate = () => {
    const [date, setDate] = useState<DatesType>({
        startDate: null, deadline: null
    })

    const settingDate = (value: Nullable<Dayjs>, method: 'startDate' | 'deadline') => {
        const methodForSettingValue = {
            [CalendarValues.StartDate]: (dateValue: Nullable<Dayjs>) => {
                dateValue && setDate({
                    ...date, startDate: dateValue
                })
            },
            [CalendarValues.Deadline]: (dateValue: Nullable<Dayjs>) => {
                dateValue && setDate({
                    ...date, deadline: dateValue
                })
            },
        }
        methodForSettingValue[method](value)
    }

    const resetDate = (params: 'startDate' | 'deadline') => {
        const reset = {
            [CalendarValues.StartDate]: () => {
                setDate({
                    ...date, startDate: null
                })
            },
            [CalendarValues.Deadline]: () => {
                setDate({
                    ...date, deadline: null
                })
            },
        }
        reset[params]()
    }

    return (
        {
            date,
            resetDate,
            settingDate
        }
    )
}