import {authAPI, LoginParamsType} from "../../../API/auth-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../app-reducer/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {setIsAuthAC} from "./auth-reducer";

export const loginTC = (login: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const loginResponse = await authAPI.login(login)
        if (loginResponse.resultCode === 0) {
            dispatch(setIsAuthAC({isAuth: true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(loginResponse, dispatch)
            return loginResponse.fieldsErrors
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const logOutResponse = await authAPI.logOut()
        if (logOutResponse.resultCode === 0) {
            dispatch(setIsAuthAC({isAuth: false}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(logOutResponse, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}