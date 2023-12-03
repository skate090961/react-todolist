import {Dispatch} from "redux";
import {authAPI} from "../../../API/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {setIsAuthAC} from "../auth-reducer/auth-reducer";

const initialState = {
    isDarkMode: false as boolean,
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean
} as const

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/TOGGLE-MODE':
            return {...state, isDarkMode: !state.isDarkMode}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR-MESSAGE':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = typeof initialState
type ActionsType = ReturnType<typeof toggleAppModeAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorMessageAC>
    | ReturnType<typeof setAppIsInitializedAC>

//action
export const toggleAppModeAC = () => ({type: 'APP/TOGGLE-MODE'} as const)
export const setAppErrorMessageAC = (error: string | null) => ({type: 'APP/SET-ERROR-MESSAGE', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppIsInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

//thunk
export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const response = await authAPI.me()
        if (response.resultCode === 0) {
            dispatch(setIsAuthAC(true))
        } else {
            handleServerAppError(response, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppIsInitializedAC(true))
    }
}