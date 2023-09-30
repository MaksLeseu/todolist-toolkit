import {instance} from "../../common/api/common.api";
import {baseTodo} from "../Todolists/todolists.api";

const base = 'tasks'
export const tasksApi = {
    fetchTasks(todolistId: string) {
        return instance.get<{ items: TasksType[] }>(`${baseTodo}/${todolistId}/${base}`)
    },
    createTask(arg: AddTaskArgType) {
        return instance.post(`/${baseTodo}/${arg.todolistId}/${base}`, {title: arg.title, description: arg.description})
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete(`/${baseTodo}/${todolistId}/${base}/${taskId}`)
    },
    changeTask(arg: AddDescriptionArgType) {
        return instance.put(`/${baseTodo}/${arg.todolistId}/${base}/${arg.taskId}`, {description: arg.description})
    }
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
    description: string
}

type AddDescriptionArgType = {
    todolistId: string
    taskId: string
    description: string
}