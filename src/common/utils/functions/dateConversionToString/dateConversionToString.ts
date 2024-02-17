import dayjs from "dayjs";
import {conversionPerMonth} from "../conversionPerMonth/conversionPerMonth";

export const dateConversionToString = (date: dayjs.Dayjs): string => {
    return `${date.date()} ${conversionPerMonth(date.month())} ${date.year()}`
}