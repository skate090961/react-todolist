import {instance} from "./instance";

export type TaskEntityType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: number
    title: string
    todoListId: string
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponseType = {
    error: string | null
    items: TaskEntityType[]
    totalCount: number
}

type ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type CreateTaskResponseType = { item: TaskEntityType }


export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        const payload = {title}
        return instance.post<ResponseType<CreateTaskResponseType>>(`/todo-lists/${todolistId}/tasks`, payload)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const payload = model
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, payload)
    }
}