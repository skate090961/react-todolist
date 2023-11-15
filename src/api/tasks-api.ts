import {instance} from "./instance";

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
            .then(data => data.data.items)
    },
    createTask(todolistId: string, title: string) {
        const payload = {title}
        return instance.post<ResponseType<CreateTaskResponseType>>(`/todo-lists/${todolistId}/tasks`, payload)
            .then(data => data.data.data.item)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

//types
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type TaskType = UpdateTaskModelType & {
    addedDate: string
    id: string
    order: number
    todoListId: string
}
type GetTasksResponseType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}
type ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type UpdateTaskType = ResponseType<{ item: TaskType }>
type CreateTaskResponseType = { item: TaskType }