import {instance} from "./instance"

export const todoListsAPI = {
    async getTodoLists() {
        const response = await instance.get<TodoListType[]>(`/todo-lists`)
        return response.data
    },
    async createTodoList(title: string) {
        const payload = {title}
        const response = await instance.post<ResponseType<CreateTodoListResponseType>>(`/todo-lists`, payload)
        return response.data
    },
    async deleteTodoList(id: string) {
        const response = await instance.delete<ResponseType>(`/todo-lists/${id}`)
        return response.data
    },
    async updateTodoList(id: string, title: string) {
        const payload = {title}
        const response = await instance.put<ResponseType>(`/todo-lists/${id}`, payload)
        return response.data
    }
}

//types
export type TodoListType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: RESULT_CODE
    messages: string[],
    fieldsErrors: any[],
    data: D
}
type CreateTodoListResponseType = { item: TodoListType }

export enum RESULT_CODE {
    SUCCEEDED = 0,
    ERROR = 1,
    CAPTCHA = 10
}
