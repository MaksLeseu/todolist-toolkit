import {instance} from "../../common/api/common.api";
import {TodolistsType} from "./todolists.types";

export const baseTodo = 'todo-lists'

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistsType[]>(`${baseTodo}`)
    },
    addTodolist(title: string) {
        return instance.post(`${baseTodo}`, {title})
    },
    removeTodolist(todolistId: string) {
        return instance.delete(`/${baseTodo}/${todolistId}`)
    }
}