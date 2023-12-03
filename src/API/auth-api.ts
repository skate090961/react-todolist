import {instance} from "./instance";
import {AxiosResponse} from "axios";
import {ResponseType} from "./todoLists-api";

export const authAPI = {
    async me() {
        const response: AxiosResponse<ResponseType<MeResponseType>> = await instance.get('auth/me')
        return response.data
    },
    async login(login: LoginParamsType) {
        const response: AxiosResponse<ResponseType<{ userId?: number }, FieldsErrorType>> =
            await instance.post('auth/login', login)
        return response.data
    },
    async logOut() {
        const response: AxiosResponse<ResponseType> = await instance.delete('auth/login')
        return response.data
    }
}

//types
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