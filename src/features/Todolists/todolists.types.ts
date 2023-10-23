export type TodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter: TodolistFilterType
}

export type TodolistFilterType = 'all' | 'active' | 'completed'