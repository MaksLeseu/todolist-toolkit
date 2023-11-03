type PriorityValuesType = {
    [key: number]: string
}

export const priorityConversionToString = (priority: number) => {
    const priorityValues: PriorityValuesType = {
        0: 'Low',
        1: 'Middle',
        2: 'High',
        3: 'Urgently',
        4: 'Later'
    }

    return priorityValues[priority]
}