import {instance} from "./instance";
import {RESULT_CODE} from "./todoLists-api";

export const tasksAPI = {
    async getTasks(todolistId: string) {
        const response = await instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
        return response.data
    },
    async createTask(todolistId: string, title: string) {
        const payload = {title}
        const response = await instance.post<ResponseType<CreateTaskResponseType>>(`/todo-lists/${todolistId}/tasks`, payload)
        return response.data
    },
    async deleteTask(todolistId: string, taskId: string) {
        const response = await instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return response.data
    },
    async updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const response = await instance.put<UpdateTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
        return response.data
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
    resultCode: RESULT_CODE
}
type UpdateTaskType = ResponseType<{ item: TaskType }>
type CreateTaskResponseType = { item: TaskType }