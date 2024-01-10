export type TodoListType = {
  addedDate: string
  id: string
  order: number
  title: string
}
export type ResponseTodoListType<D = {}, E = any> = {
  resultCode: RESULT_CODE
  messages: string[]
  fieldsErrors: E[]
  data: D
}
export type CreateTodoListResponseType = { item: TodoListType }

export enum RESULT_CODE {
  SUCCEEDED = 0,
  ERROR = 1,
  CAPTCHA = 10,
}
