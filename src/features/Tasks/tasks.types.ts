import {Dayjs} from "dayjs";
import {Nullable} from "../../common/utils/types/optional.types";

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
    startDate: Nullable<Dayjs>
    deadline: Nullable<Dayjs>
    priority: number
}

export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: number;
    priority?: number;
    startDate?: Nullable<Dayjs>
    deadline?: Nullable<Dayjs>
};

export type UpdateTaskArgType = {
    taskId: string;
    todolistId: string;
    domainModel: UpdateDomainTaskModelType;
};

export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: number;
    priority: number;
    startDate: Nullable<Dayjs>
    deadline: Nullable<Dayjs>
};