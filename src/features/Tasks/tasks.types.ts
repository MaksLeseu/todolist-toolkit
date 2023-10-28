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
    deadline: Dayjs | null
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
    domainModel: UpdateDomainTaskModelType;
    todolistId: string;
    deadline?: Dayjs | null
    startDate?: Dayjs | null
};

export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: number;
    priority: number;
    startDate: Dayjs | null;
    deadline: Dayjs | null;
};