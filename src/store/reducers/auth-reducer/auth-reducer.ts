import {authAPI, MeResponseType, LoginParamsType} from "../../../API/auth-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../app-reducer/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

const initialState = {
    authUser: null,
    isAuth: false
}

type AuthStateType = {
    authUser: null | MeResponseType
    isAuth: boolean
}
type ActionsType =
    | ReturnType<typeof setAuthUserAC>
    | ReturnType<typeof setIsAuthAC>

export const authReducer = (state: AuthStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'SET-AUTH-USER':
            return {...state, authUser: action.authUser, isAuth: true}
        case 'SET-IS-AUTH':
            return {...state, isAuth: action.isAuth}
        default:
            return state
    }
}

//action
export const setAuthUserAC = (authUser: MeResponseType) =>
    ({type: 'SET-AUTH-USER', authUser} as const)
export const setIsAuthAC = (isAuth: boolean) =>
    ({type: 'SET-IS-AUTH', isAuth} as const)

//thunk
export const loginTC = (login: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const loginResponse = await authAPI.login(login)
        if (loginResponse.resultCode === 0) {
            dispatch(setIsAuthAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(loginResponse, dispatch)
            return loginResponse.fieldsErrors
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const logOutResponse = await authAPI.logOut()
        if (logOutResponse.resultCode === 0) {
            dispatch(setIsAuthAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(logOutResponse, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}

