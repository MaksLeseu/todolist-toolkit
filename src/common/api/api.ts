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

export type TodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
}