export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: null
    deadline: null
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export type AddTaskArgType = {
    todolistId: string
    title: string
    description: string
}

export type AddDescriptionArgType = {
    todolistId: string
    taskId: string
    description: TasksType
}