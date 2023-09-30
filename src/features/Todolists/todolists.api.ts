import {instance} from "../../common/api/common.api";

export const baseTodo = 'todo-lists'

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistsType[]>(`${baseTodo}`)
    },
    removeTodolist(todolistId: string) {
        return instance.delete(`/${baseTodo}/${todolistId}`)
    }
}

export type TodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
}