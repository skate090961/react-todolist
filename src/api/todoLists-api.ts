import {instance} from "./instance";

export type TodoListType = {
    addedDate: string
    id: string
    order: number
    title: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: any[],
    data: D
}
type CreateTodoListResponseType = { item: TodoListType }

export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>(`/todo-lists`)
    },
    createTodoList(title: string) {
        const payload = {title}
        return instance.post<ResponseType<CreateTodoListResponseType>>(`/todo-lists`, payload)
    },
    deleteTodoList(id: string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`)
    },
    updateTodoList(id: string, title: string) {
        const payload = {title}
        return instance.put<ResponseType>(`/todo-lists/${id}`, payload)
    }
}