import { instance } from "common/api"
import { AxiosResponse } from "axios"
import { ResponseTodoListType } from "features/TodoLists/api/todoListsApi.types"

export const authApi = {
  async me() {
    const response: AxiosResponse<ResponseTodoListType<MeResponseType>> = await instance.get("auth/me")
    return response.data
  },
  async login(login: LoginParamsType) {
    const response: AxiosResponse<ResponseTodoListType<{ userId?: number }, FieldsErrorType>> = await instance.post(
      "auth/login",
      login
    )
    return response.data
  },
  async logOut() {
    const response: AxiosResponse<ResponseTodoListType> = await instance.delete("auth/login")
    return response.data
  },
}

export type FieldsErrorType = {
  field: string
  error: string
}

export type MeResponseType = {
  id: number
  login: string
  email: string
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}
