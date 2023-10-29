import {Dayjs} from "dayjs";

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
    startDate: Dayjs | null
    deadline: Dayjs | null
    priority: number
}

export type AddDescriptionArgType = {
    todolistId: string
    taskId: string
    description: TasksType
}

export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: number;
    priority?: number;
    startDate?: Dayjs | null;
    deadline?: Dayjs | null;
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
    startDate: Dayjs | null;
    deadline: Dayjs | null;
};