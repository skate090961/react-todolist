import {instance} from "./instance"

export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>(`/todo-lists`)
            .then(res => res.data)
    },
    createTodoList(title: string) {
        const payload = {title}
        return instance.post<ResponseType<CreateTodoListResponseType>>(`/todo-lists`, payload)
            .then(res => res.data)
    },
    deleteTodoList(id: string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`)
    },
    updateTodoList(id: string, title: string) {
        const payload = {title}
        return instance.put<ResponseType>(`/todo-lists/${id}`, payload)
    }
}

//types
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
