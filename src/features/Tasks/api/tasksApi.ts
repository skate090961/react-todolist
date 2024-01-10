import { instance } from "common/api/instance"
import {
  AddTaskArgsType,
  CreateTaskResponseType,
  GetTasksResponseType,
  ResponseTaskType,
  UpdateTaskModelType,
  UpdateTaskType,
} from "features/Tasks/api/tasksApi.types"

export const tasksApi = {
  async getTasks(todolistId: string) {
    const response = await instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    return response.data
  },
  async createTask(arg: AddTaskArgsType) {
    const response = await instance.post<ResponseTaskType<CreateTaskResponseType>>(`/todo-lists/${arg.todoId}/tasks`, {
      title: arg.title,
    })
    return response.data
  },
  async deleteTask(todolistId: string, taskId: string) {
    const response = await instance.delete<ResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    return response.data
  },
  async updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    const response = await instance.put<UpdateTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    return response.data
  },
}
