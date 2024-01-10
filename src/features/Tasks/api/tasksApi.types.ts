import { UpdateDomainTaskModelType } from "features/Tasks/model/tasksSlice"
import { RESULT_CODE } from "features/TodoLists/api/todoListsApi.types"

export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft,
}

export enum TaskPriorities {
  Low,
  Middle,
  Hi,
  Urgently,
  Later,
}

export type AddTaskArgsType = { todoId: string; title: string }
export type UpdateTaskArgsType = {
  todoId: string
  taskId: string
  domainModel: UpdateDomainTaskModelType
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
export type GetTasksResponseType = {
  error: string | null
  items: TaskType[]
  totalCount: number
}
export type ResponseTaskType<D = {}> = {
  data: D
  fieldsErrors: string[]
  messages: string[]
  resultCode: RESULT_CODE
}
export type UpdateTaskType = ResponseTaskType<{ item: TaskType }>
export type CreateTaskResponseType = { item: TaskType }
