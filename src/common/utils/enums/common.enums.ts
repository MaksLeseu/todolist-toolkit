export const ResultCode = {
    Success: 0,
    Error: 1,
    Captcha: 10,
} as const;

export const TaskStatuses = {
    New: 0,
    InProgress: 1,
    Completed: 2,
    Draft: 3,
} as const;

export const CalendarValues = {
    StartDate: 'startDate',
    Deadline: 'deadline'
}