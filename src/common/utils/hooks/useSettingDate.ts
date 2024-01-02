import {useState} from "react";
import {Nullable} from "../types/optional.types";
import {Dayjs} from "dayjs";

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
            'startDate': (dateValue: Nullable<Dayjs>) => {
                dateValue && setDate({
                    ...date, startDate: dateValue
                })
            },
            'deadline': (dateValue: Nullable<Dayjs>) => {
                dateValue && setDate({
                    ...date, deadline: dateValue
                })
            },
        }
        methodForSettingValue[method](value)
    }

    const resetDate = (params: 'startDate' | 'deadline') => {
        const reset = {
            'startDate': () => {
                setDate({
                    ...date, startDate: null
                })
            },
            'deadline': () => {
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