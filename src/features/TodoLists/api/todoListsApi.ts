import { instance } from "common/api/instance"
import {
  CreateTodoListResponseType,
  ResponseTodoListType,
  TodoListType,
} from "features/TodoLists/api/todoListsApi.types"

export const todoListsApi = {
  async getTodoLists() {
    const response = await instance.get<TodoListType[]>(`/todo-lists`)
    return response.data
  },
  async createTodoList(title: string) {
    const payload = { title }
    const response = await instance.post<ResponseTodoListType<CreateTodoListResponseType>>(`/todo-lists`, payload)
    return response.data
  },
  async deleteTodoList(id: string) {
    const response = await instance.delete<ResponseTodoListType>(`/todo-lists/${id}`)
    return response.data
  },
  async updateTodoList(id: string, title: string) {
    const payload = { title }
    const response = await instance.put<ResponseTodoListType>(`/todo-lists/${id}`, payload)
    return response.data
  },
}
