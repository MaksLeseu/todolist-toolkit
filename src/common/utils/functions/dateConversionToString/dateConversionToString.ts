import dayjs from "dayjs";

export const dateConversionToString = (date: dayjs.Dayjs) => dayjs(date).toString().slice(5, 16)