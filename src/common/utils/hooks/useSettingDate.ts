import {useState} from "react";
import {Nullable} from "../types/optional.types";
import {Dayjs} from "dayjs";

export const useSettingDate = () => {
    const [deadline, setDeadline] = useState<Nullable<Dayjs>>(null)
    const [startDate, setStartDate] = useState<Nullable<Dayjs>>(null)

    const settingDate = (value: Nullable<Dayjs>, method: 'startDate' | 'deadline') => {
        const methodForSettingValue = {
            'startDate': (date: Nullable<Dayjs> | number) => {
                date && setStartDate(date as Nullable<Dayjs>)
            },
            'deadline': (date: Nullable<Dayjs> | number) => {
                date && setDeadline(date as Nullable<Dayjs>)
            },
        }
        methodForSettingValue[method](value)
    }

    const resetDate = (params: 'startDate' | 'deadline') => {
        const reset = {
            'startDate': () => {
                setStartDate(null)
            },
            'deadline': () => {
                setDeadline(null)
            },
        }
        reset[params]()
    }

    return (
        {
            deadline,
            startDate,
            resetDate,
            settingDate
        }
    )
}