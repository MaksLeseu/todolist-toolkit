import {instance} from "../../common/api/common.api";
import {baseTodo} from "../Todolists/todolists.api";
import {AddTaskArgType, TasksType, UpdateTaskModelType} from "./tasks.types";

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
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(`/${baseTodo}/${todolistId}/${base}/${taskId}`, model)
    }
}
