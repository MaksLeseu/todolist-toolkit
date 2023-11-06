import dayjs from "dayjs";
import {conversionPerMonth} from "../conversionPerMonth/conversionPerMonth";

export const dateConversionToString = (date: dayjs.Dayjs): string => {
    /*date.toString().slice(5, 16)*/
    return `${date.date()} ${conversionPerMonth(date.month())} ${date.year()}`
}