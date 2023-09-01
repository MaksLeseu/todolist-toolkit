import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1cdd9f77-c60e-4af5-b194-659e4ebd5d41'
    }
})

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistsType[]>(`todo-lists`)
    }
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<{ items: TasksType }>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(arg: AddTaskArgType) {
        return instance.post(`todo-lists/${arg.todolistId}/tasks`, {title: arg.title})
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export type TodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
}

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

type AddTaskArgType = {
    todolistId: string
    title: string
}
